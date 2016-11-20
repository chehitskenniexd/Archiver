'use strict';

const Sequelize = require('sequelize');
const db = require('../index.js');

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
