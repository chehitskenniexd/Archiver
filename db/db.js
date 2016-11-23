'use strict'

const chalk = require('chalk');
const Sequelize = require('sequelize');

// note the name of the database
const name = (process.env.DATABASE_NAME || 'archiver')
const url = process.env.DATABASE_URL || `postgres://localhost:5432/${name}`
console.log(chalk.yellow(`Hello, Opening database connection to ${url}`));

// create the database instance
module.exports = new Sequelize(url, {
  logging: false, // set to console.log to see the raw SQL queries
  native: true // lets Sequelize know we can use pg-native for ~30% more speed
});