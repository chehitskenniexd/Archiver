const Sequelize = require('sequelize')
const db = require('APP/db')

const User = db.define('users', {
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    validate: {
			isEmail: true,
			notEmpty: true,
		}
  },
  password: Sequelize
})

module.exports = User