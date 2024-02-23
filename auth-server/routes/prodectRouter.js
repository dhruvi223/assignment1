const productController = require('../controller/productController.js')
//const isAdmin = require('../verify.js');
const express = require('express')
const routerp = require('express').Router();
routerp.post('/addProduct',productController.addProduct)
routerp.get('/allProducts',productController.getAllProduct)
routerp.get('/:id',productController.getOneProduct)
routerp.put('/:id',productController.updateProduct)
routerp.delete('/:id',productController.deleteProduct)

module.exports = routerp;