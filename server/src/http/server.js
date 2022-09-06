import express from "express";
import bodyParser from "body-parser";
import logMiddleware from "./middlewares/logMiddleware.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import requireJwtAuthentication from "./middlewares/requireJwtAuthentication.js";
import rolesMiddleware from "./middlewares/rolesMiddleware.js";
import healthcheckRouter from "./routes/healthcheck.route.js";
import loginRouter from "./routes/login.route.js";
import usersRouter from "./routes/users.route.js";
import userRouter from "./routes/user.route.js";
import organismesRouter from "./routes/organismes.route.js";
import demandesActivationCompteRouter from "./routes/demandesActivationCompte.route.js";

import { ROLES } from "../common/constants/roles.js";

export default async (services) => {
  const app = express();

  const requireAuthentication = requireJwtAuthentication(services);
  const adminOnly = rolesMiddleware(ROLES.ADMINISTRATOR);

  app.use(bodyParser.json());
  app.use(logMiddleware());

  // open routes
  app.use("/api/healthcheck", healthcheckRouter());
  app.use("/api/login", loginRouter(services));
  app.use("/api/user", userRouter(services));
  app.use("/api/organismes", organismesRouter(services));
  app.use("/api/demandes-activation-compte", demandesActivationCompteRouter(services));

  // admin routes
  app.use("/api/users", requireAuthentication, adminOnly, usersRouter(services));

  app.use(errorMiddleware());

  return app;
};
