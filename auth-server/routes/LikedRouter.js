const likedController = require("../controller/likedController");
const express = require("express");
const routerl = require("express").Router();

routerl.post("/addlProduct", likedController.addlProduct);
routerl.get("/allLProducts", likedController.getAllLProduct);
routerl.delete("/deletel", likedController.deletelProduct)
module.exports = routerl;
