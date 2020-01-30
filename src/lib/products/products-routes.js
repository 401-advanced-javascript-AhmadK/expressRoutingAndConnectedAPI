/* eslint-disable no-unused-vars */
'use strict';

const express = require('express');
const products = require('./products-model.js');

const router = express.Router();

router.get('/products', getProducts);
router.get('/products/:id', getOneProduct);
router.post('/products', addProducts);
router.put('/products/:id', updateProducts);
router.delete('/products/:id', deleteProducts);

function getProducts(req, res, next) {
  products.get()
    .then(data => {
      const output = {
        count: data.length,
        results: data,
      };
      res.status(200).json(output);
    }).catch(next);
}
function getOneProduct(req, res, next) {
  products.get(req.params.id)
    .then(data => {
      res.status(200).json(data);
    }).catch(next);
}
function addProducts(req, res, next) {
  products.create(req.body)
    .then(data => {
      res.status(201).json(data);
    });
}
function updateProducts(req, res, next) {
  products.update(req.params.id, req.body)
    .then(data => {
      res.status(200).json(data);
    }).catch(next);
}
function deleteProducts(req, res, next) {
  products.delete(req.params.id)
    .then(data => {
      res.status(200).json(data);
    }).catch(next);
}
module.exports = router;