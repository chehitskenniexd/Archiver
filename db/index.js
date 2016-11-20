'use strict';

const chalk = require('chalk')
const Sequelize = require('sequelize')
// const DATABASE_URI = require(path.join(__dirname, '../env')).DATABASE_URI;

const url = process.env.DATABASE_URL || `postgres://localhost:5432/${name}`

console.log(chalk.yellow(`Opening database connection to ${url}`));

// create the database instance
const db = module.exports = new Sequelize(url, {
  logging: false, // set to console.log to see the raw SQL queries
  native: true // lets Sequelize know we can use pg-native for ~30% more speed
});

// pull in our models
require('./models');

console.log("DB??????", db)

// sync the db, creating it if necessary
db.sync({force: true})
    .then(ok => console.log(chalk.green(`Synced models to db ${url}`)))
    .catch(fail => {
      console.error(chalk.red('Failed db sync' + fail))
    });
