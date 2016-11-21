let dbRun = require('./index.js');
const seeds = require('./seeds');
const blob = seeds.blob,
      commit = seeds.commit,
      file = seeds.file,
      project = seeds.project,
      user = seeds.user,
      user_project = seeds.user_project;


dbRun.didSync
  .then(() => dbRun.sync({force: true}))
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
  .finally(() => dbRun.close())
