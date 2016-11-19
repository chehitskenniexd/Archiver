'use strict';

const chalk = require('chalk')
const Sequelize = require('sequelize')
// const DATABASE_URI = require(path.join(__dirname, '../env')).DATABASE_URI;

const url = process.env.DATABASE_URL || `postgres://localhost:5432/${name}`

console.log(chalk.yellow(`Opening database connection to ${url}`));


// Require all the models in our database
const Blob = require('./models/blob');
const Commit = require('./models/commit');
const File = require('./models/file');
const Project = require('./models/project');
const User = require('./models/user');

// Form the associations
User.hasMany(Project);
Project.hasMany(User);
Project.hasOne(User, {as: 'creator'});

Project.hasMany(Commit);
Commit.belongsTo(Project);

Commit.hasOne(Blob);
Blob.belongsTo(Commit);

Blob.hasMany(File);
File.belongsTo(Blob);

// create the database instance
const db = module.exports = new Sequelize(url, {
  logging: false, // set to console.log to see the raw SQL queries
  native: true // lets Sequelize know we can use pg-native for ~30% more speed
});

// sync the db, creating it if necessary
db.sync({force: true})
    .then(ok => console.log(chalk.green(`Synced models to db ${url}`)))
    .catch(fail => {
      console.error(chalk.red('Failed db sync' + fail));
