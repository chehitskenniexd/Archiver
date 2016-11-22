'use strict';

const Sequelize = require('sequelize');
const db = require('../db');

const Commit = db.define('commit', {
  date: Sequelize.DATE,
  message: Sequelize.TEXT,
  //if we store previous commits as a str and not an association
  previous_commit: Sequelize.STRING,
  hash: Sequelize.STRING
})

module.exports = Commit;
