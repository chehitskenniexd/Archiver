const fs = require('fs');
const crypto = require('crypto');

function getSha1Hash(data) {
    return crypto
        .createHash('sha1')
        .update(data)
        .digest('hex');
}

export function initNewProject(dirPath) {
    // Sets the owner/author of this project 

    // Check for a valid directory
    // fs.statSync() returns a valid fs.Stats object if exists, else and error (try/catch)
    try {
        fs.statSync(dirPath).isDirectory();
    } catch (err) {
        console.log('Invalid directory: ', err);
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
    return true;
}

export function addNewFile(filePath) {
    // check for valid file 
    try {
        fs.statSync(filePath).isFile();
    } catch (err) {
        console.log('Invalid file: ', err);
        return false;
    }

    // create a hash for the file
    const fileContents = fs.readFileSync(filePath);
    const fileName = filePath.split('/').pop().split('.').shift();
    const fileHash = getSha1Hash(`${fileName}${fileContents}`);

    // create .archive/objects and create a new 'object' based on the file
    const dirPath = filePath.split('/').pop().join('/');
    const objectPath = `${dirPath}.archive/objects`;
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
    fs.writeFile(`${objectPath}/${objDirName}/${objFileName}`, fileContents);

    // create .archive/index.txt that adds it as a tracked object
    const indexInfo = `${fileHash} ${fileName}\n`
    const indexPath = `${dirPath}.archive/index.txt`;
    try {
        fs.statSync(indexPath)
    } catch (err) {
        fs.writeFile(indexPath, indexInfo);
    } finally {
        fs.appendFileSync(indexPath, indexInfo);
    }

    return true;
}