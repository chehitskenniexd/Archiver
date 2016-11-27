'use strict';

const express = require('express');
const router = express.Router();
const session = require('express-session');
const User = require('../db/models/user');

module.exports = router;

router.post('/', (req, res, next) => {
    console.log('in user post', req.body)
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(foundUser => {
          console.log("foundUser?", foundUser)
            let resObj = {};
            if (!foundUser) {
                resObj.notFound = "user not found";
                res.json(resObj);
            } else {
                return Promise.all([foundUser.authenticate(req.body.password), foundUser, resObj]);
            }
        })
        .spread((isUser, foundUser, resObj) => { //loggedInUser = boolean
            if (isUser) {
                req.session.user = foundUser;
                resObj.foundUser = foundUser;
                res.json(resObj);
            } else {
                resObj.message ='Wrong password';
                res.json(resObj);
            }
        })
        .catch(next)
});
