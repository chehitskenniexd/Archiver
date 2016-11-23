
const Sequelize = require('sequelize');
const db = require('../db');
const bcrypt = require('bcrypt');

const User = db.define('user', {
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  password: Sequelize.STRING
});

module.exports = User;
