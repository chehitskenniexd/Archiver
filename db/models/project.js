'use strict'
const Sequelize = require('sequelize')
const db = require('APP/db')

const Project = db.define('projects', {
  name: Sequelize.STRING
})

module.exports = Project