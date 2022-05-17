const Sequelize = require('sequelize');

const db = new Sequelize({
  dialect: 'sqlite',
  storage: '../data/users.db',
});

module.exports = db;
