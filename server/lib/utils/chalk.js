'use strict';

const chalk = require('chalk');

const green = (string) => {
  return chalk.green(string);
};

const red = (string) => {
  return chalk.red(string);
};

const blue = (string) => {
  return chalk.blue(string);
};

module.exports = {
  green, red, blue
};
