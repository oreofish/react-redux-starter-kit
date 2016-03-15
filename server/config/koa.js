'use strict'
const path = require('path')
const serve = require('koa-static-cache')
const session = require('koa-generic-session')
const MongoStore = require('koa-sess-mongo-store')
const responseTime = require('koa-response-time')
const logger = require('koa-logger')
// const views = require('co-views')
const compress = require('koa-compress')
const convert = require('koa-convert')
const errorHandler = require('koa-error')
const bodyParser = require('koa-bodyparser')
const paginate = require('koa-pagination')

const STATIC_FILES_MAP = {}
const SERVE_OPTIONS = { maxAge: 365 * 24 * 60 * 60 }

module.exports = function(app, config, dbconfig, passport) {
  if (!dbconfig.app.keys) { throw new Error('Please add session secret key in the config file!') }
  app.keys = dbconfig.app.keys

  if (config.env !== 'test') {
    app.use(logger())
  }

  app.use(convert(errorHandler()))

/*
  if (config.app.env === 'production') {
    app.use(serve(path.join(config.app.root, 'build', 'public'), SERVE_OPTIONS, STATIC_FILES_MAP))
  } else {
    app.use(require('koa-proxy')({
      host: 'http://localhost:2992',
      match: /^\/_assets\//,
    }))
  }
*/

  app.use(convert(session({
    key: 'react_kit.sid',
    store: new MongoStore({ url: dbconfig.mongo.url }),
  })))

  app.use(convert(bodyParser()))
  app.use(convert(passport.initialize()))
  app.use(convert(passport.session()))

  app.get('/', paginate(), function *() {
    // `paginate` middleware will inject a `pagination` object in the `koa` context,
    // which will allow you to use the `pagination.offset` and `pagination.limit`
    // in your data retrieval methods.
    this.body = foobar.getData({
      limit: this.pagination.limit,
      offset: this.pagination.offset
    });

    // This is needed in order to expose the length in `Content-Range` header.
    this.pagination.length = foobar.count();
  })

/*  app.use(function *(next) {
    this.render = views(config.app.root + '/src/views', {
      map: { html: 'swig' },
      cache: config.app.env === 'development' ? 'memory' : false,
    })
    yield next
  })*/

  app.use(convert(compress()))
  app.use(convert(responseTime()))
}
