const db = require('./index.js');
const seeds = require('./seeds');
const blob = seeds.blob,
      commit = seeds.commit,
      file = seeds.file,
      project = seeds.project,
      user = seeds.user,
      user_project = seeds.user_project;


db.didSync
  .then(() => db.sync({force: true}))
// commented out for syncing later
  // .then(seedUsers)
  // .then(users => {
  //   db.query(alterSequence('users', users.length));
  //   console.log(`Seeded ${users.length} users OK`)
  // })
  // .then(seedCategories)
  // .then(categories => {
  //     db.query(alterSequence('category', categories.length));
  //     console.log(`Seeded ${categories.length} categories OK`)
  //   })
  // .then(seedProducts)
  // .then(products => {
  //   db.query(alterSequence('product', products.length));
  //   console.log(`Seeded ${products.length} products OK`);
  // })
  // .then(seedProductCategoryJoin)
  // .then(seedReviews)
  // .then(reviews => console.log(`Seeded ${reviews.length} reviews OK`))
  // .catch(error => console.error(error))
  // .finally(() => db.close())
