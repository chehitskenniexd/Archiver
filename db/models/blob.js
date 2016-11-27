
'use strict';

const Sequelize = require('sequelize');
const db = require('../../db');

const Blob = db.define('blob', {
  hash: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Blob;
