import express from "express";
import bodyParser from "body-parser";
import logMiddleware from "./middlewares/logMiddleware.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import healthcheckRouter from "./routes/healthcheck.route.js";
import loginRouter from "./routes/login.route.js";
// import requireJwtAuthentication from "./middlewares/requireJwtAuthentication.js";

export default async (services) => {
  const app = express();

  // const requireAuthentication = requireJwtAuthentication(services);

  app.use(bodyParser.json());
  app.use(logMiddleware());

  // open routes
  app.use("/api/healthcheck", healthcheckRouter());
  app.use("/api/login", loginRouter(services));

  app.use(errorMiddleware());

  return app;
};
