'use strict';

const express = require('express');
const router = express.Router();
const session = require('express-session');
const User = require('../db/models/index').User;
const UserProject = require('../db/models/user_project');
const Project = require('../db/models/project');

module.exports = router;

// FIND ALL USER INFO ON CURRENT PROJECT
router.get('/:projectId', (req, res, next) => {
  Project.findAll({
    where: {
      id: req.params.projectId
    },
    include: [User]
  })
  .then(projects => res.json({projects}))
  .catch(next)
})
    // UserProject.findAll({
    //   where: {
    //     projectId: req.params.projectId,
    //     role: {
    //       $ne: 'author'
    //     }
    //   }
    // })

// UPDATE MY INVITATIONS
router.put('/:projectId/:userId', (req, res, next) => {
  UserProject.findOne({
    where: {
      projectId: req.params.projectId,
      userId: req.params.userId
    }
  })
  .then(foundProject => {
    foundProject.update({
      role: 'collaborator'
    })
    res.json({
      message: "Role updated successfully!"
    });
  })
  .catch(next)
});


// DELETE CURRENT COLLABS OR INVITES
router.delete('/:projectId/:userId', (req, res, next) => {
  UserProject.destroy({
    where: {
      projectId: req.params.projectId,
      userId: req.params.userId
    }
  })
  .then(deletedProject => {
    res.json(deletedProject);
  })
  .catch(next)
});
