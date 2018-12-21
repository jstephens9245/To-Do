'use strict';

const jest = require('jest');
const argv = process.argv.slice(2);
const seed = require('./seed.js');

seed.then(() => {
  jest.run([ ...argv ]);
});
