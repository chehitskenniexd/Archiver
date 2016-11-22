'use strict';


const chalk = require('chalk');
const Sequelize = require('sequelize');
// const DATABASE_URI = require(path.join(__dirname, '../env')).DATABASE_URI;

const name = (process.env.DATABASE_NAME || 'archiver')

const url = process.env.DATABASE_URL || `postgres://localhost:5432/${name}`

console.log(chalk.yellow(`Hello, Opening database connection to ${url}`));

// require the db instance
const db = require('../db/db');

const seeds = require('../db/seeds');
const blob = seeds.blob,
      commits = seeds.commit,
      file = seeds.file,
      projects = seeds.project,
      users = seeds.user,
      user_project = seeds.user_project;

// pull in our models
require('../db/models');


// seed functions
const seedUser = () => db.Promise.map(users,user => db.model('user').create(user));
const seedProject = () => db.Promise.map(projects,project => db.model('project').create(project));
const seedCommit = () => db.Promise.map(commits,commit => db.model('commit').create(commit));


// sync the db, creating it if necessary
db.sync({ force: false })
  .then(ok => console.log(chalk.green(`Synced models to db ${url}`)))
  /*------------UNCOMMENT TO RESEED DB -----------*/
  // .then(seedUser)
  // .then(users => {
  //   // db.query(alterSequence('users', users.length));
  //   console.log(`Seeded ${users.length} users OK`)
  // })
  // .then(seedProject)
  // .then(projects => {
  //     // db.query(alterSequence('projects', projects.length));
  //     console.log(`Seeded ${projects.length} projects OK`);
  //   })
  // .then(user_project)
  // .then(seedCommit)
  // .then(commits => {
  //   // db.query(alterSequence('product', commits.length));
  //   console.log(`Seeded ${commits.length} commits OK`);
  // })
  // .then(blob)
  // .then(file)
  // .then(files => console.log(`Seeded ${files.length} files OK`))
    /*------------END OF UNCOMMENT TO RESEED DB -----------*/
  .catch(fail => {
    console.error(chalk.red('Failed db sync' + fail))
    // Otherwise, do this autocreate nonsense
    console.log(`Creating database ${name}...`)
    return new Promise((resolve, reject) =>
      require('child_process').exec(`createdb "${name}"`, resolve)
    ).then(() => db.sync({ force: true }))
  });


