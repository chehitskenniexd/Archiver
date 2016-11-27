
const db = require('../db');
const seeds = require('./seeds');
// const Promise = require('bluebird');

const blobs = seeds.blob,
  commits = seeds.commit,
  files = seeds.file,
  projects = seeds.project,
  users = seeds.user,
  userProjects = seeds.userProject,
  blobFiles = seeds.blobFile;



// seed functions

const seedUser = () => db.Promise.each(users, user => db.model('user').create(user));
const seedProject = () => db.Promise.each(projects, project => db.model('project').create(project));
const seedFile = () => db.Promise.each(files, file => db.model('file').create(file));
const seedUserProject = () => db.Promise.each(userProjects, userProject => db.model('userProject').create(userProject));
const seedCommit = () => db.Promise.each(commits, commit => db.model('commit').create(commit));
const seedBlob = () => db.Promise.each(blobs, blob => db.model('blob').create(blob));
const seedBlobFile = () => db.Promise.each(blobFiles, blobFile => db.model('blobFile').create(blobFile));

db.didSync
  .then(() => db.sync({ force: true }))
  .then(seedUser)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .then(seedProject)
  .then(projects => console.log(`Seeded ${projects.length} projects OK`))
  .then(seedFile)
  .then(files => console.log(`Seeded ${files.length} files OK`))
  .then(seedUserProject)
  .then(userProjects => console.log(`Associated/seeded userProject files OK`))
  .then(seedCommit)
  .then(commits => console.log(`Seeded ${commits.length} commits OK`))
  .then(seedBlob)
  .then(blobs => console.log(`Seeded ${blobs.length} blobs OK`))
  .then(seedBlobFile)
  .then(blobFiles => console.log(`Associated/seeded blobFile files OK`))
  .catch(error => console.error(error))
  .finally(() => db.close());
