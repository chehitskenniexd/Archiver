
const Sequelize = require('sequelize');
const db = require('../db');

const Commit = db.define('commit', {
  date: Sequelize.DATE,
  message: Sequelize.TEXT,

  // we store previous commits as a str and not an association
  // to allow 2 previous commits in the case of merging
  previous_commit: Sequelize.STRING,

  hash: Sequelize.STRING
});

module.exports = Commit;
