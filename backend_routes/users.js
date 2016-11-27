'use strict';

const express = require('express');
const router = express.Router();
const session = require('express-session');
const User = require('../db/models/index').User;
const UserProject = require('../db/models/user_project');
const Project = require('../db/models/project');

module.exports = router;

// FIND PROJECTS FOR THE LOGGED IN USER

router.get('/:userId/projects', (req, res, next) => {
    User.findById(req.params.userId)
    .then(user => {
        console.log(user);
        res.json(user)
    })
    .catch(next);
})