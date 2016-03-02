"use strict";
import convert from 'koa-convert'
import Router from 'koa-router'
import mongoose from "mongoose"
import generateApi from 'koa-mongo-rest'

const countController = require("../controllers/count");
const indexController = require("../controllers/index");
const authController = require("../controllers/auth");

var secured = function *(next) {
  //if (this.isAuthenticated()) {
    yield next;
  //} else {
  //  this.status = 401;
  //}
};

module.exports = function(app, passport) {
  // register functions
  var router = new Router();

  router.use(function *(next) {
    this.type = "json";
    yield next;
  });

  router.get("/", function *() {
    this.type = "html";
    yield indexController.index.apply(this);
  });

  router.get("/api/auth", authController.getCurrentUser);
  router.post("/api/auth", authController.signIn);

  router.all("/api/signout", authController.signOut);
  router.post("/api/signup", authController.createUser);

  // secured routes
  router.get("/api/value", secured, countController.getCount);
  router.get("/api/inc", secured, countController.increment);
  router.get("/api/dec", secured, countController.decrement);

  app.use(convert(router.routes()));
  app.use(convert(router.allowedMethods()));

  //add REST routes to your app. Prefix is optional
  generateApi(router, mongoose.model('Document'), '/api');
};
