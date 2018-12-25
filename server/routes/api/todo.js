'use strict';

const express = require('express');
const Router = express.Router;
const router = new Router();
const {ToDo} = require('../../models');
const chalk = require('chalk');

router.get('/', (req, res, next) => {
  ToDo.findAll()
  .then((to_do) => {
    // console.log(to_do);
    res.json(to_do);
  })
  .catch(next);

});
router.put('/:id', (req, res, next) => {
  const changes = {}

  ToDo.findOne({where: {id: Number(req.params.id)}})
  .then((to_do) => {
    to_do.status === "active" ? changes.status = "completed" : changes.status = "active"
    ToDo.update(changes, {
      where: {
        id: Number(req.params.id)
      }
      }).then(() => {
        ToDo.findOne({where: {id: Number(req.params.id)}})
      .then((to_do) => {
        res.json(to_do);
      })
    })
  }).catch(next);
});

router.post('/', (req, res, next) => {
  ToDo.create({
    to_do: req.body.to_do,
    status: 'active',
  })
  .then((to_do) => {
    res.json(to_do);
  })
  .catch(next);

});

router.delete('/:id', (req, res, next) => {
  ToDo.destroy({ where: { id: req.params.id }})
    .then(() => res.sendStatus(204))
    .catch(next);
});

router.delete('/', (req, res, next) => {
  ToDo.findAll()
  .then((to_do) => {
    var idArray = [...to_do.map((todo) => { return todo.id })]
    // console.log(chalk.blue(idArray));
    for (var i = 0; i < idArray.length; i++) {
      ToDo.destroy({ where: { id: idArray[i] }})
        .then()
        .catch(next);
    }
  }).then(() => { res.json()})
  .catch(next);
  });

module.exports = router;
