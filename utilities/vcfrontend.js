const fs = require('fs');
const crypto = require('crypto');

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

  const indexPath = `${dirPath}/.archive/index.txt`;
  try {
    fs.statSync(indexPath)
  } catch (err) {
    fs.writeFileSync(indexPath, '', 'utf-8');
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
export function commitFileChanges(filePath, message, mergeHash, date, _fileHash, fileContent) {
  // Project has been added and initialized at this point
  // Create a new object for the commit 
  // file hash is pulled from the index
  let objContents = '';
  const fileContents = fileContent ? fileContent :fs.readFileSync(filePath, 'utf-8');
  const splitPath = filePath.split('/');
  const dirPath = splitPath.slice(0, splitPath.length - 1).join('/');
  const fileName = filePath.split('/').pop().split('.').shift();
  let fileHash = _fileHash ? _fileHash : '';
  if(!fileHash){
    const indexContents = fs.readFileSync(`${dirPath}/.archive/index.txt`, 'utf-8');
    const splitIndexContents = indexContents.split('\n');
    const content = splitIndexContents.filter((content, index) => {
      return content.split('/')[1] === fileName;
    })
    fileHash = content[0]; // this is the file hash from the index;
  }
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

  let hashContents = `${fileName}${fileContents}${message}`;
  const commitHash = createNewArchiveObject(filePath, hashContents, objContents, dirPath);

  // create an object for the file itself as well as the commit
  hashContents = `${fileName}${fileContents}`;
  const objHash = createNewArchiveObject(filePath, hashContents, fileContents, dirPath);

  // Create a new ref to point at the new commit
  // if (!fs.access(`${refsPath}/${fileName}`, () => { })) {
  //   fs.writeFileSync(`${refsPath}/${fileName}`, commitHash, 'utf-8');
  // }
  newRefForNewCommit(refsPath, fileName, commitHash);

  return commitHash;
}