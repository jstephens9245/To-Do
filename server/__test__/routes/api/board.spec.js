'use strict';
const chai = require('chai');
const expect = chai.expect;
const express = require('express');
const request = require('supertest');
const bodyParser = require('body-parser');

const router = require('../../../routes/api/board.js');
const {User, Board} = require('../../../models');


describe('Root Router', () => {
  let app;
  const testUser = {id: 1};

  beforeAll(() => {
    app = express();

    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

    app.use((req, res, next) => {
      req.user = testUser;
      next();
    }, router);

  });

  describe('GET /', () => {

    it('should respond with 200', () => {
      return request(app)
        .get('/')
        .expect(200);
    });

    it('should respond with an array of boards', () => {
      return request(app)
        .get('/')
        .expect(res => {
          expect(res.body).to.be.an('object');
        });
    });

    it('should return a user\'s boards if logged in', () => {
      return request(app)
        .get('/')
        .expect(result => {
          expect(result.body.permissions[0].user_id).to.equal(testUser.id);
        });
    });
  });
  describe('GET /:boardId', () => {

    it('should respond with 200', () => {
      const boardId = 1;
      return request(app)
        .get(`/${boardId}`)
        .expect(200);
    });

    it('should return specific board when provided with a boardId', () => {
      const boardId = 1;
      return request(app)
        .get(`/${boardId}`)
        .expect(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.id).to.equal(testUser.id);
        });
    });
  });

  describe('POST /', () => {

    it('should create and return board with given input parameters', () => {
      return request(app)
        .post('/')
        .send({boardName: 'Test Board'})
        .expect(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.name).to.equal('Test Board');
        });
    });
  });

  describe('PUT /:id', () => {

    it('should update board with given id', () => {
      const boardId = 2;
      return request(app)
        .put(`/${boardId}`)
        .send({name: 'Test Board', url: 'Test_Board'})
        .expect(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0]).to.equal(1);
        });
    });
  });

  describe('DELETE /', () => {

    it('should delete board with given id', () => {
      let deleteBoardId;
      return Board.create({name: 'testboard'})
        .then(board => {
          deleteBoardId = board.id;
        }).then(() => {
          return request(app)
            .delete(`/${deleteBoardId}`)
            .expect(res => {
              console.log('res.body', res.body);
            // expect(res.body).to.be.an('array');
              expect(res.body).to.equal(1);
            });
        });
    });
  });

});
