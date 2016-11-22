'use strict';

const Sequelize = require('sequelize');
const db = require('../db');

const UserProject = db.define('user_project', {
  role: {
    type: Sequelize.ENUM('author', 'collaborator'),
    defaultValue: 'collaborator'
  }
}, {});

module.exports = UserProject;
