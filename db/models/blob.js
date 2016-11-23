
const Sequelize = require('sequelize');
const db = require('../index.js');

const Blob = db.define('blob', {
  hash: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Blob;
