const v1Router = require("express").Router();
const mediaRouter = require("./mediaRouter");

function init(logger) {
  v1Router.use("/upload", mediaRouter(logger));

  //add more routers
  logger.info("v1Router initialization completed");

  return v1Router;
}

module.exports = logger => init(logger);