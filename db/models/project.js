'use strict';

const Sequelize = require('sequelize');
const db = require('../db');

const Project = db.define('project', {
  name: Sequelize.STRING
})

module.exports = Project
