'use strict';

const express = require('express');
const router = express.Router();
const Models = require('../db/models');
const FEActions = require('../utilities/vcfrontend');
const BEActions = require('../utilities/vcbackend');
const Promise = require('bluebird');

router.get('/:projectId', (req, res, next) => {
  Models.Project.findAll({
    where: { id: req.params.projectId },
    include: [{ all: true }]
  }).then(projects => res.json(projects))
    .catch(err => console.error(err));
})

router.post('/create', (req, res, next) => {
  // This is called when a user adds a project
  const {userId, projName, fileName, fileContents, date, message,
    fileHash, commitHash, committer, collabs} = req.body;
  let blobFileObj = {};
  let userProjectObj = {};
  // Create the project
  Models.Project.create({ name: projName })
    .then(project => {
      console.log('created the project');
      userProjectObj.projectId = project.id;
      // create the user => project associations w/ collabs
      if (collabs.length < 1) {
        return project;
      }
      return Models.User.findAll({
        where: {
          email: {
            $any: collabs
          }
        }
      })
        .then(users => {
          let usersData = [];
          usersData = users.map(user => {
            return {
              role: 'pending',
              userId: user.dataValues.id,
              projectId: userProjectObj.projectId
            }
          })
          usersData.push({
            role: 'author',
            userId: userId,
            projectId: userProjectObj.projectId
          })
          return usersData.map(user => {
            Models.UserProject.create(user)
              .then(res => res.data)
              .catch(err => console.error(err));
          })
        })
    })
    .then(project => {
      // create the commit
      console.log('created the userProject');
      const commitObj = {
        date: date,
        message: message,
        hash: commitHash,
        committer: committer,
        projectId: userProjectObj.projectId
      };
      return Models.Commit.create(commitObj)
    })
    .then(commit => {
      // create the blob
      const blobObj = {
        hash: fileHash,
        commitId: commit.id
      }
      return Models.Blob.create(blobObj);
    })
    .then(blob => {
      // create the blob => file association
      blobFileObj.blobId = blob.id;
      const fileObj = {
        file_name: fileName,
        file_contents: fileContents,
      }
      return Models.File.create(fileObj);
    })
    .then(file => {
      // create the file
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