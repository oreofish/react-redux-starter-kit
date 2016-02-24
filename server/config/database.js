const database = {
  development: {
    app: {
      name: "Koa React Gulp Mongoose Mocha - Dev",
      keys: [ "super-secret-hurr-durr" ],
    },
    mongo: {
      url: "mongodb://localhost/koareactfullexample_dev",
    },
  },
  test: {
    app: {
      name: "Koa React Gulp Mongoose Mocha - Test realm",
      keys: [ "super-secret-hurr-durr" ],
    },
    mongo: {
      url: "mongodb://localhost/koareactfullexample_test",
    },
  },
  production: {
    app: {
      name: "Koa React Gulp Mongoose Mocha",
      keys: [ "super-secret-aa-hurr-durr" ],
    },
    mongo: {
      url: "mongodb://localhost/koareactfullexample",
    },
  },
};

export default database
