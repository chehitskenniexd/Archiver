let db = require('./db.js');
const models = require('./models/index');
const seeds = require('./seeds');
const blob = seeds.blob,
  commits = seeds.commit,
  file = seeds.file,
  projects = seeds.project,
  users = seeds.user,
  user_project = seeds.user_project;

// seed functions
const seedUser = () => db.Promise.map(users, user => models.User.create(user));
const seedProject = () => db.Promise.map(projects, project => models.Project.create(project));
const seedCommit = () => db.Promise.map(commits, commit => models.UserProject.create(commit));

db.sync({ force: true })
  .then(seedUser)
  .then(users => {
    console.log(`Seeded ${users.length} users OK`)
  })
  .then(seedProject)
  .then(projects => {z
    console.log(`Seeded ${projects.length} projects OK`);
  })
  .then(user_project)
  .then(seedCommit)
  .then(commits => {
    console.log(`Seeded ${commits.length} commits OK`);
  })
  .then(blob)
  .then(file)
  .then(files => console.log(`Seeded ${files.length} files OK`))
  .catch(error => console.error(error))
