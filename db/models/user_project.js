'use strict';

const Sequelize = require('sequelize');
const db = require('../index.js');

const UserProject = db.define('user_project', {
  role: {
    type: Sequelize.ENUM('author', 'collaborator'),
    defaultValue: 'collaborator'
  }
}, {});

module.exports = UserProject;
