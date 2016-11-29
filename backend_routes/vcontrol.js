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

router.post('/:projectId', (req, res, next) => {
    // need to create commit, blob, {blobFile}, file

    // commit needs date/message/previousCommit/currentHash/commiter/projectId
        // Note: hash is filename/filecontents/message
    // blob needs hash/commitId
        // Note: hash is filename/filecontents
    // file needs filename/filecontents
    // blobFile through table needs blobId, fileId
    const commitObj = {
        date: new Date(),
        message: req.body.message,
        previousCommit: req.body.previousCommit,
        hash: FEActions.getSha1Hash(`${req.body.file_name}${req.body.file_contents}${req.body.message}`),
        commiter: req.body.committer,
        projectId: req.body.projectId
    };
    let blobFileObj = {};
    Models.Commit.create(commitObj)
        .then(commit => {
            const blobObj = {
                hash: FEActions.getSha1Hash(`${req.body.file_name}${req.body.file_contents}`),
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
        .then(res => res.json(res))
        .catch(err => console.error(err));
})

module.exports = router;