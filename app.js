const express = require("express");
const compression = require("compression");
const cors = require("cors");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(compression());
app.use(cors());

const logger = require("./lib/logger");

const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || "media-receiver";

/**
 * error handling
 */
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send(err.stack);
});

process.on("uncaughtException", err => {
  logger.error(err.stack);
});

app.listen(PORT, () => logger.info(`${APP_NAME} listening at port ${PORT}`));

const v1Router = require("./router/v1/indexRouter");

app.use("/v1", v1Router(logger));