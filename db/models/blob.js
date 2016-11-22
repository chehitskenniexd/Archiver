'use strict';
console.log("BLOG FILE DIRNAME " + __dirname)
const Sequelize = require('sequelize');
const db = require('../db');
console.log(db)
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
