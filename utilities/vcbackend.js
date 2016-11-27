const fs = require('fs');
const crypto = require('crypto');
const Models = require('../db/models');
const Commit = Models.Commit;
const Project = Models.Project;
const File = Models.File;
const commitFileChanges = require('./vcfrontend').commitFileChanges;

export function getSha1Hash(data) {
  return crypto
    .createHash('sha1')
    .update(data)
    .digest('hex');
}

// This is specifically for file changes
export function mergeFileChanges(filePath, localHash, serverHash, serverContents) {
  // Find the common ancestor of the local and merge hashes
  // Common ancestor will always be the current local hash

  // Case 1: If the local ancestor and the server ancestor are the same, no need to merge
  // Case 2: or changes on local, but server is the same
  if (localHash === serverHash) {
    return false;
  }

  const splitPath = filePath.split('/');
  const dirPath = splitPath.slice(0, splitPath.length - 1).join('/');

  const fileName = filePath.split('/').pop().split('.').shift();
  const archiveDir = localHash.slice(0, 2);
  const archiveFilename = localHash.slice(2);
  const ancestorContents = fs.readFileSync(`${dirPath}/.archive/objects/${archiveDir}/${archiveFilename}`, 'utf-8');

  // Check for changes between local/ancestor, and server/ancestor
  const localContents = fs.readFileSync(`${filePath}`);
  const bLocalChanges = !(localContents === ancestorContents); // if equal, then no changes
  const bServerChanges = !(serverContents === ancestorContents); // if equal, then no changes

  // Case 3: if local has no changes and server does, then overwrite local
  if (!bLocalChanges && bServerChanges) {
    fs.writeFileSync(`${filePath}`, serverContents, 'utf-8');
    return true;
  }
  // Case 4: if local AND server has changes, user picks one
  // DEFAULT: take the server one (implement user after GUI updated)
  // Commit the new changes with a message (automated for now)
  else if (bLocalChanges && bServerChanges) {
    // TODO: remove this string?
    const message = `updating local ${fileName} to match the server ${fileName}`;
    // store the local content just in case
    const newHash = commitFileChanges(filePath, 'storing local before merge');
    
    fs.writeFileSync(`${filePath}`, serverContents, 'utf-8');
    // create the commit info with new parent and server parent
    const finalMergeHash = commitFileChanges(filePath, 'updating and saving all files', serverHash);
    
    return true;
  }
}

// Update the .archive directory
export function pullDataFromServer(filePath) {
  // Find localHash
  const splitPath = filePath.split('/');
  const dirPath = splitPath.slice(0, splitPath.length - 1).join('/');
  const projectName = dirPath.split('/').pop();
  const fileName = filePath.split('/').pop().split('.').shift();

  // check if the directory exists as well as the .archive
  try {
    fs.statSync(dirPath);
  } catch (err) {
    fs.mkdirSync(dirPath);
  }

  try {
    fs.statSync(`${dirPath}/.archive`);
  } catch (err) {
    initNewProject(dirPath);    
  }

  return Project.findOne({
      where:{
        name: projectName
      },
      include: [{all: true}]
  }).then(data => {
    //return data;
    let projectCommits = data.commits;

    // see if a commit already exists
    let refsExist = true;
    const refsUrl = `${dirPath}/.archive/refs/${fileName}`;
    try {
      fs.statSync(refsUrl);
    } catch (err) {
      refsExist = false;
    }

    if(refsExist){ 
      // if a commit exists, pull the MOST RECENT COMMITS from db
      const localHash = fs.readFileSync(refsUrl, 'utf-8');
      const localCommit = data.commits.find(commit => commit.hash === localHash);
      // update the commits if we have the previous
      projectCommits = data.commits.filter(commit => {
        return commit.date > localCommit.date
      })
    }

    // save all the contents from the server onto the local archive
    projectCommits.forEach(commit => {
      const commitFilename = commit.blob && commit.blob.files[0] 
        ? commit.blob.files[0].dataValues.file_name : null;
      if(commitFilename){
        const commitFilePath = `${dirPath}/${commitFilename}`;
        createNewCommitFromServer(commitFilePath, commit);
      }
    })

    // check for a merge, just in case
    if(refsExist){
      const localHash = fs.readFileSync(refsUrl, 'utf-8');
      const serverHash = projectCommits.sort((a, b) => a.id > b.id ? a : b).pop();
      if(serverHash){
        const serverContents = projectCommits.find(commit => commit.hash === serverHash)
          .blob.files[0].dataValues.file_contents;
        mergeFileChanges(filePath, localHash, serverHash, serverContents);
      }
    }
  })
}

function createNewCommitFromServer(filePath, commit) {
  // This is like a commit, but it generates it with commit information
  const message = commit.message;
  const date = commit.date;
  const fileContent = commit.blob && commit.blob.files[0] 
    ? commit.blob.files[0].dataValues.file_contents : '';
  const commitHash = commit.hash;
  
  if(fileContent === ''){
    return false;
  }

  const splitPath = filePath.split('/');
  const dirPath = splitPath.slice(0, splitPath.length - 1).join('/');
  const fileName = filePath.split('/').pop().split('.').shift();

  const refsPath = `${dirPath}/.archive/refs`;
  let objContents = `date:${date}/msg:${message}/committer:/fileHash:${commitHash}`;

  try {
    fs.statSync(refsPath);
  } catch (err) {
    fs.mkdirSync(refsPath);
  }
  
  if (commit.previous_commit > 0) {
    objContents += `parent:${commit.previous_commit}/`;
  }
  // TODO: Need to implement this for merges
  // if (mergeHash) {
  //   objContents += `parent:${parent}/`;
  // }

  const hashContents = `${fileName}${fileContent}${message}`;
  const newCommitHash = createNewArchiveObject(filePath, hashContents, objContents, dirPath);

  // Create a new ref to point at the new commit IF it doesn't exist
  if (!fs.access(`${refsPath}/${fileName}`, () => { })) {
    fs.writeFileSync(`${refsPath}/${fileName}`, commitHash, 'utf-8');
  }

  return newCommitHash;
}
