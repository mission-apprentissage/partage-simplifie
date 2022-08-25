const express = require("express");
const bodyParser = require("body-parser");

const logMiddleware = require("./middlewares/logMiddleware");
const errorMiddleware = require("./middlewares/errorMiddleware");

const healthcheckRouter = require("./routes/healthcheck.route");

module.exports = async (services) => {
  const app = express();

  app.use(bodyParser.json());
  app.use(logMiddleware());

  // open routes
  app.use("/api/healthcheck", healthcheckRouter(services));

  // admin routes

  app.use(errorMiddleware());

  return app;
};
