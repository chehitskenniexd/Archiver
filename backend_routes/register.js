'use strict';

const express = require('express');
const router = express.Router();
const session = require('express-session');
const User = require('../db/models/user');

module.exports = router;

router.post('/', (req, res, next) => {
    User.findOrCreate({
        where: {
            email: req.body.email
        }, 
        defaults: {
            password: req.body.password,
            first_name: req.body.first_name,
            last_name: req.body.last_name   
        }
    })
    .spread((foundUser, created) => {
        let resObj = {};
        if (!created) {
            resObj.message = "that user already exists";
        }
     
        return Promise.all([foundUser.authenticate(req.body.password), foundUser, resObj])  
    })
    .spread((isAuthUser, foundUser, resObj) => {
        if (isAuthUser){
            req.session.user = foundUser;
            resObj.foundUser = foundUser;
            res.json(resObj);
        } 
    })
    .catch(next);
})
