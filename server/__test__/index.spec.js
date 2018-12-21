'use strict';

const chai = require('chai');
const expect = chai.expect;

const app = require('../index');

describe('ExpressApp', () => {
  it('should return an express app', () => {
    expect(app).to.exist;
    expect(app).to.be.a('function');
  });
});
