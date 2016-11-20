'use strict';

const Sequelize = require('sequelize');
const db = require('../index.js');

const Project = db.define('project', {
  name: Sequelize.STRING
})

module.exports = Project
