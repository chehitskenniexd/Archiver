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
    include: [{all: true}]
  })
  .then(projects => res.json(projects))
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


// ADDING AN INVITED USER TO USERPROJECT MODEL
router.post('/:projectId', (req, res, next) => {
  User.find({
    where: {
      email: req.body.email
    }
  })
  .then(foundUser => {
    if (foundUser) {
      return UserProject.create({
        userId: foundUser.id,
        projectId: req.params.projectId,
        role: 'pending'
      })
      .then(createdUP => {
        if (createdUP) {
          res.json({message: 'Pending invite created'})
        } else {
          next();
        }
      })
    } else {
      next();
    }
  })
  .catch(next)
})



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
