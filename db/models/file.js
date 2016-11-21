'use strict';

const Sequelize = require('sequelize');
const db = require('../index.js');


const File = db.define('file', {
  file_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  file_contents: {
    type: Sequelize.TEXT
  }
}, {});

module.exports = File;
