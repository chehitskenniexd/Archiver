'use strict';

const express = require('express');
const router = express.Router();
const session = require('express-session');
const User = require('../db/models/user');

module.exports = router;

router.post('/', (req, res, next) => {
    console.log("WE GOT INTO THE ROUTE!", req.body)
    User.findOrCreate({
        where {email: req.body.email}, 
        defaults: {
            password: req.body.password,
            first_name: req.body.first_name,
            last_name: req.body.last_name   
        }
    })
    .spread((foundUser, created) => {
        if (!created) {
            res.send("User already exists");
        }
        console.log("ABOUT TO LOGIN NEW USER")
        return Promise.all([foundUser.authenticate(req.body.password), foundUser]);
    })
    .spread((isUser, foundUser) => {
        if (isUser){
            console.log("WE ARE SETTING A SESSION FOR, ", foundUser)
            req.session.user = foundUser;
            res.send(foundUser);
        }    
    })
    .catch(next);
})

