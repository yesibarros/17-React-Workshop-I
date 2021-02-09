'use strict';
const path = require('path');
const chalk = require('chalk');
const Sequelize = require('sequelize');
//const DATABASE_URI = require(path.join(__dirname, '../env')).DATABASE_URI;
const DATABASE_URI = "postgres://postgres@localhost:5432/juke"
console.log(chalk.yellow('\nOpening connection to PostgreSQL'));

// create the database instance
module.exports = new Sequelize(DATABASE_URI, {
  logging: false, // set to console.log to see the raw SQL queries
  operatorsAliases: Sequelize.Op, // set operators
});
