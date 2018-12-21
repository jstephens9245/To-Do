'use strict';
const chai = require('chai');
const expect = chai.expect;
const express = require('express');
const request = require('supertest');

const router = require('../../../routes/api/note.js');
const app = express();

app.use(router);

describe('Root Router', () => {
  it('should exist', () => {
    expect(router).to.exist;
  });

  describe('GET /', () => {
    it('should respond with 200', () => {
      return request(app)
        .get('/')
        .expect(200);
    });

    it('should respond with an array of notes', () => {
      return request(app)
        .get('/')
        .expect(res => {
          expect(res.body).to.be.an('array');
        });
    });

    it('should limit results when provided with a `limit` query param', () => {
      const limit = 5;
      return request(app)
        .get('/')
        .query({limit})
        .expect(res => {
          expect(res.body.length).to.equal(limit);
        });
    });

    it('should return a user\'s notes when provided with a userId', () => {
      const userId = 3;
      const limit = 5;
      return request(app)
        .get('/')
        .query({userId, limit})
        .expect(res => {
          const filteredResults = res.body.filter(note => note.user.id === userId);
          expect(res.body.length).to.be.above(0);
          expect(res.body.length).to.equal(filteredResults.length);
        });
    });

    it('should return a board\'s notes when provided with a boardId', () => {
      const boardId = 3;
      const limit = 5;
      return request(app)
        .get('/')
        .query({boardId, limit})
        .expect(res => {
          const filteredResults = res.body.filter(note => note.board.id === boardId);
          expect(res.body.length).to.be.above(0);
          expect(res.body.length).to.equal(filteredResults.length);
        });
    });
  });

  describe('GET /:id', () => {
    it('should respond with the note that matches the id param', () => {
      const id = 1;
      return request(app)
        .get(`/${id}`)
        .expect((res) => {
          expect(res.body.id).to.equal(id);
        })
        .expect(200);
    });
  });

  // TODO: Write tests for POST, PUT, DELETE
});
