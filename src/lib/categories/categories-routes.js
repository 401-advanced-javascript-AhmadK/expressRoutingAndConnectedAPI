/* eslint-disable no-unused-vars */
'use strict';

const express = require('express');
const categories = require('./categories-model.js');

const router = express.Router();

router.get('/categories', getCategories);
router.get('/categories/:id', getOneCategory);
router.post('/categories', addCategories);
router.put('/categories/:id', updateCategories);
router.delete('/categories/:id', deleteCategories);

function getCategories(req, res, next) {
  categories.get()
    .then(data => {
      const output = {
        count: data.length,
        results: data,
      };
      res.status(200).json(output);   
    }).catch(next);
}
function getOneCategory(req, res, next) {
  categories.get(req.params.id)
    .then(data => {
      res.status(200).json(data);
    }).catch(next);
}
function addCategories(req, res, next) {
  categories.create(req.body)
    .then(data => {
      res.status(201).json(data);
    });
}
function updateCategories(req, res, next) {
  categories.update(req.params.id, req.body)
    .then(data => {
      res.status(200).json(data);
    });
}

function deleteCategories(req, res, next) {
  categories.delete(req.params.id)
    .then(data => {
      let output ={
        results: data,
        msg: 'Item is deleted',
      };
      res.status(200).json(output);
    });
}
module.exports = router;