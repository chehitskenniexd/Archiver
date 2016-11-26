'use strict';

const express = require('express');
const router = express.Router();
const session = require('express-session');
const UserProject = require('../db/models/user_project');

module.exports = router;

router.get('/', (req, res, next) => {
    UserProject.findAll({
        where: {
            userId: req.body.id
        }
    })
        .then(foundProjectsArray => {
          console.log("foundProjectsArray?", foundProjectsArray)
            // let resObj = {};
            // if (!foundUser) {
            //     resObj.notFound = "user not found";
            //     res.json(resObj);
            // } else {
            //     return Promise.all([foundUser.authenticate(req.body.password), foundUser, resObj]);
            // }
        })
        // .spread((isUser, foundUser, resObj) => { //loggedInUser = boolean
        //     if (isUser) {
        //         req.session.user = foundUser;
        //         resObj.foundUser = foundUser;
        //         res.json(resObj);
        //     } else {
        //         resObj.message ='Wrong password';
        //         res.json(resObj);
        //     }
        // })
        .catch(next)
});
