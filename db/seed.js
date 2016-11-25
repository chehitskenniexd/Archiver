let db = require('./db.js');
const seeds = require('./seeds');
const blob = seeds.blob,
  commits = seeds.commit,
  file = seeds.file,
  projects = seeds.project,
  users = seeds.user,
  user_project = seeds.user_project;

// seed functions
const seedUser = () => db.Promise.map(users, user => require('./models/user').create(user));
// const seedUser = () => db.Promise.map(users, user => db.model('user').create(user));
const seedProject = () => db.Promise.map(projects, project => require('./models/project').create(project));
// const seedProject = () => db.Promise.map(projects, project => db.model('project').create(project));
const seedCommit = () => db.Promise.map(commits, commit => require('./models/commit').create(commit));
// const seedCommit = () => db.Promise.map(commits, commit => db.model('commit').create(commit));

db.sync({ force: true })
  .then(seedUser)
  .then(users => {
    // db.query(alterSequence('users', users.length));
    console.log(`Seeded ${users.length} users OK`)
  })
  .then(seedProject)
  .then(projects => {
    // db.query(alterSequence('projects', projects.length));
    console.log(`Seeded ${projects.length} projects OK`);
  })
  .then(user_project)
  .then(seedCommit)
  .then(commits => {
    // db.query(alterSequence('product', commits.length));
    console.log(`Seeded ${commits.length} commits OK`);
  })
  .then(blob)
  .then(file)
  .then(files => console.log(`Seeded ${files.length} files OK`))
  .catch(error => console.error(error))
