
const Sequelize = require('sequelize');
const db = require('../../db');


const File = db.define('file', {
  file_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  file_contents: {
    type: Sequelize.TEXT
  },
  buffer: {
    type: Sequelize.BLOB
  }
}, {});

module.exports = File;
