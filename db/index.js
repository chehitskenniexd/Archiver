'use strict';

const chalk = require('chalk')
const Sequelize = require('sequelize')
// const DATABASE_URI = require(path.join(__dirname, '../env')).DATABASE_URI;

const name = (process.env.DATABASE_NAME || 'archiver')

const url = process.env.DATABASE_URL || `postgres://localhost:5432/${name}`

console.log(chalk.yellow(`Hello, Opening database connection to ${url}`));
console.log("url?", url)
// create the database instance
const db = module.exports = new Sequelize(url, {
  // logging: true, // set to console.log to see the raw SQL queries
  native: true // lets Sequelize know we can use pg-native for ~30% more speed
});

// pull in our models
require('../db/models');

console.log("DB??????", db)

// sync the db, creating it if necessary
db.sync({ force: true })
  .then(ok => console.log(chalk.green(`Synced models to db ${url}`)))
  .catch(fail => {
    // console.error(chalk.red('Failed db sync' + fail))
    // Otherwise, do this autocreate nonsense
    console.log(`Creating database ${name}...`)
    return new Promise((resolve, reject) =>
      require('child_process').exec(`createdb "${name}"`, resolve)
    ).then(() => db.sync({ force: true }))
  });
