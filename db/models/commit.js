'use strict'
const Sequelize = require('sequelize')
const db = require('../db')

const Commit = db.define('Commits', {
  date: Sequelize.DATE,
  message: Sequalize.TEXT,
  //if we store previous commits as a str and not an association
  previous_commits: Sequalize.STRING
})

module.exports = Commit