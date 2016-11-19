const fs = require('fs');
const bcrypt = require('bcrypt');

export function initNewProject(dirName) {
    // Sets the owner/author of this project 

    // Check for a valid directory
    // fs.statSync() returns a valid fs.Stats object if exists, else and error (try/catch)
    try {
        fs.statSync(dirName).isDirectory();
    } catch (err) {
        console.log('Invalide directory: ', err);
        return false;
    }

    // Check for hidden directory
    // Create the hidden directory in the projeect directory
    const archiveDir = `${dirName}/.archive`;
    try {
        fs.statSync(archiveDir).isDirectory();
    } catch (err) {
        fs.mkdirSync(archiveDir);
    }
    return true;
}