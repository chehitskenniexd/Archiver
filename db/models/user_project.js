
const Sequelize = require('sequelize');
const db = require('../../db');

const UserProject = db.define('userProject', {
  role: {
    type: Sequelize.ENUM('author', 'collaborator', 'pending'),
    defaultValue: 'pending'
  }
});

UserProject.removeAttribute('id');

module.exports = UserProject;
