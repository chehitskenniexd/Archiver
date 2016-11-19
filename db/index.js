'use strict';

const chalk = require('chalk')
const Sequelize = require('sequelize')
const DATABASE_URI = require(path.join(__dirname, '../env')).DATABASE_URI;

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
const db = new Sequelize(DATABASE_URI, {
  logging: false, // set to console.log to see the raw SQL queries
  native: true // lets Sequelize know we can use pg-native for ~30% more speed
});

// sync the db, creating it if necessary
function sync(force=app.isTesting) {
  return db.sync({force: false})
    .then(ok => console.log(`Synced models to db ${url}`))
    .catch(fail => {
      if (app.isProduction) {
        console.error(fail)
        return // Don't do this auto-create nonsense in prod
      }
      // Otherwise, do this autocreate nonsense
      console.log(`Creating database ${name}...`)
      return new Promise((resolve, reject) =>
        require('child_process').exec(`createdb "${name}"`, resolve)
      ).then(() => sync(true))
    });
}

db.didSync = sync();
