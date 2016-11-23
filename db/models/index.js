
// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

// Require all the models in our database
const Blob = require('./blob');
const Commit = require('./commit');
const File = require('./file');
const Project = require('./project');
const User = require('./user');
const UserProject = require('./user_project');
const BlobFile = require('./blob_file');

// Form the associations
User.belongsToMany(Project, { through: UserProject });
Project.belongsToMany(User, { through: UserProject });

Project.hasMany(Commit);
Commit.belongsTo(Project);

Commit.hasOne(Blob);
Blob.belongsTo(Commit);

Blob.belongsToMany(File, { through: BlobFile });
File.belongsToMany(Blob, { through: BlobFile });

Commit.addScope('defaultScope', {
  include: [{ model: Blob,
    include: [{ model: File }] }]
}, {
  override: true
});

module.exports = {
  Blob,
  Commit,
  File,
  Project,
  User,
  UserProject,
  BlobFile
};
