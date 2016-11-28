'use strict';

const express = require('express');
const router = express.Router();
const Models = require('../db/models');
const FEActions = require('../utilities/vcfrontend');
const BEActions = require('../utilities/vcbackend');

router.get('/:projectId', (req, res, next) => {
    Models.Project.findAll({
        where: {id: req.params.projectId},
        include: [{all: true}]
    }).then(projects => res.json(projects))
    .catch(err => console.error(err));
})

module.exports = router;