const productController = require('../controller/productController.js')
//const isAdmin = require('../verify.js');
const express = require('express')
const routerp = require('express').Router();
routerp.post('/addProduct',productController.addProduct)
routerp.get('/allProducts',productController.getAllProduct)
routerp.get('/getOne',productController.getOneProduct)
routerp.put('/update/:title',productController.updateProduct)
routerp.delete('/delete',productController.deleteProduct)

module.exports = routerp;