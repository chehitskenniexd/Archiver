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

// DELETE CURRENT COLLABS
router.delete('/:projectId/:userId', (req, res, next) => {
  UserProject.destroy({
    where: {
      projectId: req.body.projectId,
      userId: req.body.userId
    }
  })
  .then(deletedProject => {
    console.log("Collab delete successful");

    return Project.findAll({
      where: {
        id: req.params.projectId
      },
      include: [User]
    })
  })
  .then(project => {
    res.json(project)
  })
  .catch(next)
});
