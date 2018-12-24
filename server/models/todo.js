'use strict';

const Sequelize = require('sequelize');
const db = require('./db');

const ToDo = db.define('todo', {
  to_do: {
    type     : Sequelize.STRING,
    allowNull: false
  },
  status: {
    type     : Sequelize.STRING,
    allowNull: false
  },
}, {});

module.exports = ToDo;
