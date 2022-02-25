const express = require('express');
const routes = express.Router();
const auth_middleware = require('../authentication/verify_token');
const product_controller = require('../contoller/product_controller');

// GET REQUEST for getting all Products
routes.get('/', auth_middleware, product_controller.getAllProducts);

// POST REQUEST for inserting Product
routes.post('/', auth_middleware, product_controller.addProduct);

// GET REQUEST for getting particular Product by Name
routes.get('/:name', auth_middleware, product_controller.getOneProduct);

// PATCH REQUEST for updating particular Product by Name
routes.patch('/:name', auth_middleware, product_controller.updateProduct);

// DELETE REQUEST for deleting particular Product by Name
routes.delete('/:name', auth_middleware, product_controller.deleteProduct);

module.exports = routes;