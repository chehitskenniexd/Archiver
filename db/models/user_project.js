'use strict';

const Sequelize = require('sequelize');
const db = require('../db');

const UserProject = db.define('user_project', {
  role: {
    type: Sequelize.ENUM('author', 'collaborator', 'pending'),
    defaultValue: 'pending'
  }
}, {});

UserProject.removeAttribute('id');

module.exports = UserProject;
