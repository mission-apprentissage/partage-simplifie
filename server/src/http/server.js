import express from "express";
import bodyParser from "body-parser";
import logMiddleware from "./middlewares/logMiddleware.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import healthcheckRouter from "./routes/healthcheck.route.js";

// TODO remove when using services
// eslint-disable-next-line no-unused-vars
export default async (services) => {
  const app = express();

  app.use(bodyParser.json());
  app.use(logMiddleware());

  // open routes
  app.use("/api/healthcheck", healthcheckRouter());

  app.use(errorMiddleware());

  return app;
};
