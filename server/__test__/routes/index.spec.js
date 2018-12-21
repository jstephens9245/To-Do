'use strict';

const chai = require('chai');
const expect = chai.expect;
const express = require('express');
const request = require('supertest');

const router = require('../../routes/index.js');
const app = express();

app.use(router);

describe('Root Router', () => {
  it('should exist', () => {
    expect(router).to.exist;
  });

  describe(' / ', () => {
    it('should respond with 200', (done) => {
      return request(app)
        .get('/')
        .expect(200, done);
    });
  });
});
