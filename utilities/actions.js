const fs = require('fs');
const crypto = require('crypto');

const Commit = require('../db/models/index').Commit;
const Project = require('../db/models/index').Project;
const File = require('../db/models/index').File;

export function getSha1Hash(data) {
  return crypto
    .createHash('sha1')
    .update(data)
    .digest('hex');
}

function newRefForNewCommit(refsPath, fileName, commitHash) {
  if (!fs.access(`${refsPath}/${fileName}`, () => { })) {
    fs.writeFileSync(`${refsPath}/${fileName}`, commitHash, 'utf-8');
  }
}

function createNewArchiveObject(filePath, hashContent, fileContents, dirPath) {
  // create a hash for the file
  const fileHash = getSha1Hash(`${hashContent}`);

  // create .archive/objects and create a new 'object' based on the file
  const objectPath = `${dirPath}/.archive/objects`;
  try {
    fs.statSync(objectPath);
  } catch (err) {
    fs.mkdirSync(objectPath);
  }

  // check to see if the object exists already
  // directory
  const objDirName = fileHash.slice(0, 2);
  try {
    fs.statSync(`${objectPath}/${objDirName}`);
  } catch (err) {
    fs.mkdirSync(`${objectPath}/${objDirName}`);
  }

  const objFileName = fileHash.slice(2);
  // TODO: Check if exists because there should not be a collision
  fs.writeFileSync(`${objectPath}/${objDirName}/${objFileName}`, fileContents, 'utf-8');
  return fileHash;
}

export function initNewProject(dirPath) {
  // Sets the owner/author of this project 

  // Check for a valid directory
  // fs.statSync() returns a valid fs.Stats object if exists, else and error (try/catch)
  try {
    fs.statSync(dirPath).isDirectory();
  } catch (err) {
    return false;
  }

  // Check for hidden directory
  // Create the hidden directory in the projeect directory
  const archiveDir = `${dirPath}/.archive`;
  try {
    fs.statSync(archiveDir).isDirectory();
  } catch (err) {
    fs.mkdirSync(archiveDir);
  }

  const objectPath = `${dirPath}/.archive/objects`;
  try {
    fs.statSync(objectPath).isDirectory();
  } catch (err) {
    fs.mkdirSync(objectPath);
  }

  return true;
}

export function addNewFile(filePath) {
  // check for valid file 
  if (!fs.statSync(filePath).isFile()) { return false; }

  const fileContents = fs.readFileSync(filePath);
  const fileName = filePath.split('/').pop().split('.').shift();
  const hashContents = `${fileName}${fileContents}`;
  const splitPath = filePath.split('/');
  const dirPath = splitPath.slice(0, splitPath.length - 1).join('/');
  const fileHash = createNewArchiveObject(filePath, hashContents, fileContents, dirPath);

  // create .archive/index.txt that adds it as a tracked object
  const indexInfo = `${fileHash}/${fileName}\n`
  const indexPath = `${dirPath}/.archive/index.txt`;
  try {
    fs.statSync(indexPath)
  } catch (err) {
    fs.writeFileSync(indexPath, indexInfo, 'utf-8');
  } finally {
    fs.appendFileSync(indexPath, indexInfo, 'utf-8');
  }

  return fileHash;
}

// TODO: Look to add more parameters (e.g. user_id)
export function commitFileChanges(filePath, message, mergeHash, date) {
  // Project has been added and initialized at this point
  // Create a new object for the commit 
  // file hash is pulled from the index
  let objContents = '';
  const fileContents = fs.readFileSync(filePath);
  const splitPath = filePath.split('/');
  const dirPath = splitPath.slice(0, splitPath.length - 1).join('/');
  const fileName = filePath.split('/').pop().split('.').shift();
  const indexContents = fs.readFileSync(`${dirPath}/.archive/index.txt`, 'utf-8');
  const splitIndexContents = indexContents.split('\n');
  const content = splitIndexContents.filter((content, index) => {
    return content.split('/')[1] === fileName;
  })
  const fileHash = content[0]; // this is the file hash from the index;
  const datetime = new Date().toString();
  // parent will be from the refs (/.archive/refs/fileName)
  const refsPath = `${dirPath}/.archive/refs`;
  objContents = `date:${datetime}/msg:${message}/committer:/fileHash:${fileHash}`;
  try {
    fs.statSync(refsPath);
  } catch (err) {
    fs.mkdirSync(refsPath);
  }

  if (fs.access(`${refsPath}/${fileName}`, () => { })) {
    const parent = fs.readFileSync(`${refsPath}/${fileName}`, 'utf-8')
    if (parent.length > 0) {
      objContents += `parent:${parent}/`;
    }
    if (mergeHash) {
      objContents += `parent:${parent}/`;
    }
  }

  const hashContents = `${fileName}${fileContents}${message}`;
  const commitHash = createNewArchiveObject(filePath, hashContents, objContents, dirPath);

  // Create a new ref to point at the new commit
  // if (!fs.access(`${refsPath}/${fileName}`, () => { })) {
  //   fs.writeFileSync(`${refsPath}/${fileName}`, commitHash, 'utf-8');
  // }
  newRefForNewCommit(refsPath, fileName, commitHash);

  return commitHash;
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

    if(refsExist){ // not being tested yet
      // if a commit exists, pull the MOST RECENT COMMITS from db
      const localHash = fs.readFileSync(refsUrl, 'utf-8');
      const localCommit = data.commits.find(commit => commit.hash === localHash);
      // update the commits if we have the previous
      projectCommits = data.commits.filter(commit => {
        return commit.date > localCommit.date
      })
      console.log(projectCommits);
    }

    // save all the contents from the server onto the local archive
    projectCommits.forEach(commit => {
      const commitFilename = commit.blob && commit.blob.files[0] ? commit.blob.files[0].file_name : '';
      if(commitFilename !== ''){
        const commitFilePath = `${dirPath}/${commitFilename}`;
        createNewCommitFromServer(commitFilePath, commit);
      }
    })

    // check for a merge, just in case
  })

  const serverHash = projectCommits.reduce((a, b) => a.id > b.id ? a : b);
  console.log(severHash);
  // const serverHash = newCommits[0].hash;
  // const serverContents = newCommits[0].blob.file.file_contents;
  // // run mergeFileChanges
  // mergeFileChanges(filePath, localHash, serverHash, serverContents);

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

  // Create a new ref to point at the new commit
  if (!fs.access(`${refsPath}/${fileName}`, () => { })) {
    fs.writeFileSync(`${refsPath}/${fileName}`, commitHash, 'utf-8');
  }

  return newCommitHash;
}
