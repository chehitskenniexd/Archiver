'use strict';
const Sequelize = require('sequelize');
<<<<<<< HEAD
const db = require('../index.js');
=======
const db = require('../db');
console.log(db)
>>>>>>> deac6c3986d45db9c903679a5a0d542ad1cd2ca9
const Blob = db.define('blob', {
  author: {
    type: Sequelize.STRING,
    allowNull: false
  },
  committer: {
    type: Sequelize.STRING,
    allowNull: false
  },
  hash: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {});

module.exports = Blob;
