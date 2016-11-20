'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

// Require all the models in our database
const Blob = require('./blob');
const Commit = require('./commit');
const File = require('./file');
const Project = require('./project');
const User = require('./user');

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

module.exports = {
  Blob,
  Commit,
  File,
  Project,
  User
};
