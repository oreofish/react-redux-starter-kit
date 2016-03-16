import fs from "fs"
import Koa from "koa"
import mongoose from "mongoose"
import passport from "koa-passport"
import convert from 'koa-convert'
import koaif from 'koa-if'
import webpack from 'webpack'
import webpackConfig from '../config/webpack.config.js'
import historyApiFallback from 'koa-connect-history-api-fallback'
import serve from 'koa-static'
import proxy from 'koa-proxy'
import _debug from 'debug'
import config from '../config'
import database from './config/database'
import webpackDevMiddleware from './middleware/webpack-dev'
import webpackHMRMiddleware from './middleware/webpack-hmr'

/**
 * Connect to database
 */
const dbconfig = database[config.env]
mongoose.connect(dbconfig.mongo.url);
mongoose.connection.on("error", function(err) {
  debug(err)
});

const debug = _debug('app:server')
const paths = config.utils_paths
const app = new Koa()

// Enable koa-proxy if it has been enabled in the config.
if (config.proxy && config.proxy.enabled) {
  app.use(convert(proxy(config.proxy.options)))
}

/**
 * Load the models
 */
const modelsPath = paths.base(config.dir_server) + "/models"
fs.readdirSync(modelsPath).forEach(function(file) {
  if (~file.indexOf("js")) {
    require(modelsPath + "/" + file)
  }
});

// This rewrites all routes requests to the root /index.html file
// the middleware ignore file requests.
// the middleware ignore url with prefix '/api'
app.use(koaif(convert(historyApiFallback({
  verbose: true,
  logger: console.log.bind(console)
})), (ctx) => {
  // console.log('=================== ctx: ' + JSON.stringify(ctx))
  return ctx.originalUrl.substr(0, 4) != '/api'
}))

/**
 * Server
 */
require("./config/passport")(passport, config);
require("./config/koa")(app, config, dbconfig, passport);
require("./config/routes")(app, passport); // Routes

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (config.env === 'development') {
  const compiler = webpack(webpackConfig)

  // Enable webpack-dev and webpack-hot middleware
  const { publicPath } = webpackConfig.output

  app.use(webpackDevMiddleware(compiler, publicPath))
  app.use(webpackHMRMiddleware(compiler))

  // Serve static assets from ~/src/static since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(convert(serve(paths.client('static'))))
} else {
  debug(
    'Server is being run outside of live development mode. This starter kit ' +
    'does not provide any production-ready server functionality. To learn ' +
    'more about deployment strategies, check out the "deployment" section ' +
    'in the README.'
  )

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(convert(serve(paths.base(config.dir_dist))))
}

export default app
