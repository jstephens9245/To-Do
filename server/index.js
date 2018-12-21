'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
const routes = require('./routes');
const passport = require('passport');
const { User } = require('./models');
const session = require('express-session');


app.use(logger('dev'));


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static('dist'));
app.use(express.static('public'));

app.use(session({
  secret           : 'dalek',
  resave           : false,
  saveUninitialized: false,
}));

/* passport */
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser((user, done) => {
  /* passport id is saved in the session and is later used
  to retrieve the whole object via deserializeUser function */
  user ? done(null, user.id) : null;
});

passport.deserializeUser((id, done) => {
	/* retrieve user object using user id */
  User.findById(id)
    .then((user) => {
      done(null, user);
    });
});


app.use(routes);

module.exports = app;
