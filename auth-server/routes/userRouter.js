const userController = require("../controller/userController");
const express = require("express");
const routeru = require("express").Router();
routeru.get("/get", userController.getOneUser);
module.exports = routeru;
