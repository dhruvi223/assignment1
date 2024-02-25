const likedController = require('../controller/likedController')
const express = require('express')
const routerl = require('express').Router();

routerl.post('/addlProduct',likedController.addlProduct);
routerl.get('/allLProducts',likedController.getAllLProduct);
module.exports = routerl;