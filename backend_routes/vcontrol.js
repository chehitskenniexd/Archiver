'use strict';

const express = require('express');
const router = express.Router();
const Models = require('../db/models');
const FEActions = require('../utilities/vcfrontend');
const BEActions = require('../utilities/vcbackend');

router.get('/:projectId', (req, res, next) => {
    Models.Project.findAll({
        where: { id: req.params.projectId },
        include: [{ all: true }]
    }).then(projects => res.json(projects))
        .catch(err => console.error(err));
})

router.post('/create', (req, res, next) => {
    console.log('entering /create', req.body);
    // TODO: ADD COLLABORATORS
    const {projName, fileName, fileContents, date, message,
        fileHash, commitHash, committer} = req.body;
    console.log('projName', projName);
    console.log('fileName', fileName);
    console.log('fileContents', fileContents);
    console.log('date', date);
    console.log('message', message);
    console.log('fileHash', fileHash);
    console.log('commitHash', commitHash);
    console.log('committer', committer);
    let blobFileObj = {};
    Models.Project.create({ name: projName })
        .then(project => {
            console.log('project', project);
            const commitObj = {
                date: date,
                message: message,
                hash: commitHash,
                committer: committer,
                projectId: project.id
            };
            return Models.Commit.create(commitObj)
        })
        .then(commit => {
            console.log('commit', commit);
            const blobObj = {
                hash: fileHash,
                commitId: commit.id
            }
            return Models.Blob.create(blobObj);
        })
        .then(blob => {
            console.log('blob', blob);
            blobFileObj.blobId = blob.id;
            const fileObj = {
                file_name: fileName,
                file_contents: fileContents,
            }
            return Models.File.create(fileObj);
        })
        .then(file => {
            console.log('file', file);
            blobFileObj.fileId = file.id;
            return Models.BlobFile.create(blobFileObj);
        })
        .then(response => res.json(response))
        .catch(next);
})

router.post('/:projectId', (req, res, next) => {
    // need to create commit, blob, {blobFile}, file
    // commit needs date/message/previousCommit/currentHash/commiter/projectId
    // Note: hash is filename/filecontents/message
    // blob needs hash/commitId
    // Note: hash is filename/filecontents
    // file needs filename/filecontents
    // blobFile through table needs blobId, fileId
    const commitObj = {
        date: req.body.date,
        message: req.body.message,
        previous_commit: req.body.previousCommit,
        hash: req.body.hash,
        committer: req.body.committer,
        projectId: req.body.projectId
    };
    let blobFileObj = {};
    Models.Commit.create(commitObj)
        .then(commit => {
            const blobObj = {
                hash: req.body.fileHash,
                commitId: commit.id
            }
            return Models.Blob.create(blobObj);
        })
        .then(blob => {
            blobFileObj.blobId = blob.id;
            const fileObj = {
                file_name: req.body.file_name,
                file_contents: req.body.file_contents,
            }
            return Models.File.create(fileObj);
        })
        .then(file => {
            blobFileObj.fileId = file.id;
            return Models.BlobFile.create(blobFileObj);
        })
        .then(response => res.json(response))
        .catch(err => console.error(err));
})


module.exports = router;