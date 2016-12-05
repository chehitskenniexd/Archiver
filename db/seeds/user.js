
var bcrypt = require('bcrypt');

const users = [
  {
    first_name: 'Bob',
    last_name: 'Williams',
    email: 'bob@williams.com',
    password: 'green'
  },
  {
    first_name: 'Tim',
    last_name: 'Burton',
    email: 'tim@burton.com',
    password: 'blue'
  },
  {
    first_name: 'Dean',
    last_name: 'Devlin',
    email: 'dean@devlin.com',
    password: 'purple'
  },
  {
    first_name: 'Roland',
    last_name: 'Emmerich',
    email: 'roland@emmerich.com',
    password: 'red'
  },
  {
    first_name: 'Michael',
    last_name: 'Bay',
    email: 'michael@bay.com',
    password: 'orange'
  },
  {
    first_name: 'Bella',
    last_name: 'Miller',
    email: 'bella@miller.com',
    password: 'yellow'
  },
  {
    first_name: 'George',
    last_name: 'Romero',
    email: 'george@romero.com',
    password: 'black'
  },
  {
    first_name: 'George',
    last_name: 'Lucas',
    email: 'george@lucas.com',
    password: 'white'
  },
  {
    first_name: 'Lawrence',
    last_name: 'Kasdan',
    email: 'lawrence@kasdan.com',
    password: 'brown'
  },
  {
    first_name: 'Chris',
    last_name: 'Karter',
    email: 'chris@karter.com',
    password: 'indigo'
  },
  {
    first_name: 'Gene',
    last_name: 'Wilder',
    email: 'gene@wilder.com',
    password: 'pink'
  },
  {
    first_name: 'Mel',
    last_name: 'Brooks',
    email: 'mel@brooks.com',
    password: 'aqua'
  },
  {
    first_name: 'Bailey',
    last_name: 'Clark',
    email: 'bailey@clarke.com',
    password: 'fuschia'
  },
  {
    first_name: 'Brooke',
    last_name: 'Jackson',
    email: 'brooke@jackson.com',
    password: 'turquoise'
  },
  {
    first_name: 'Brenda',
    last_name: 'Allen',
    email: 'brenda@allen.com',
    password: 'chartreuse'
  },
  {
    first_name: 'Barb',
    last_name: 'Evans',
    email: 'barb@evans.com',
    password: 'lavender'
  },
  {
    first_name: 'Ben',
    last_name: 'Martin',
    email: 'ben@martin.com',
    password: 'lilac'
  },
  {
    first_name: 'Brad',
    last_name: 'Wright',
    email: 'brad@wright.com',
    password: 'magenta'
  },
  {
    first_name: 'Bruce',
    last_name: 'King',
    email: 'bruce@king.com',
    password: 'vermilion'
  },
  {
    first_name: 'Brett',
    last_name: 'Adams',
    email: 'brett@adams.com',
    password: 'violet'
  }
];


module.exports = users;

// var newUsers = users.map(user => {
//     bcrypt.hash(user.password_digest, 10, function(err, hash) {
//         user.password_digest = hash;
//     })
//     return user;
// })

// module.exports = newUsers;

