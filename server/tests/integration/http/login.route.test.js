import { strict as assert } from "assert";
import { config } from "../../../config/index.js";
import { startServer } from "../../utils/testUtils.js";
import jwt from "jsonwebtoken";
import { ROLES } from "../../../src/common/constants/roles.js";

describe("API Route Login", () => {
  it("Vérifie qu'on peut se connecter en tant qu'OF", async () => {
    const { httpClient, services } = await startServer();

    const userEmail = "user@test.fr";

    await services.users.createUser({
      email: userEmail,
      password: "password",
      role: ROLES.OF,
    });

    const response = await httpClient.post("/api/login", {
      email: userEmail,
      password: "password",
    });

    assert.equal(response.status, 200);
    const decoded = jwt.verify(response.data.access_token, config.auth.user.jwtSecret);
    assert.ok(decoded.iat);
    assert.ok(decoded.exp);
    assert.equal(decoded.sub, userEmail);
    assert.equal(decoded.iss, config.appName);
    assert.deepEqual(decoded.role, ROLES.OF);
  });

  it("Vérifie qu'on peut se connecter en tant qu'administrateur", async () => {
    const { httpClient, services } = await startServer();

    const userEmail = "user@test.fr";

    await services.users.createUser({
      email: userEmail,
      password: "password",
      role: ROLES.ADMINISTRATOR,
    });

    const response = await httpClient.post("/api/login", {
      email: userEmail,
      password: "password",
    });

    assert.equal(response.status, 200);
    const decoded = jwt.verify(response.data.access_token, config.auth.user.jwtSecret);
    assert.ok(decoded.iat);
    assert.ok(decoded.exp);
    assert.equal(decoded.sub, userEmail);
    assert.equal(decoded.iss, config.appName);
    assert.deepEqual(decoded.role, ROLES.ADMINISTRATOR);
  });

  it("Vérifie qu'un mot de passe invalide est rejeté", async () => {
    const { httpClient, services } = await startServer();

    await services.users.createUser({
      email: "user@test.fr",
      password: "password",
      role: ROLES.ADMINISTRATOR,
    });

    const response = await httpClient.post("/api/login", {
      email: "user@test.fr",
      password: "INVALID",
    });

    assert.equal(response.status, 401);
  });

  it("Vérifie qu'un login invalide est rejeté", async () => {
    const { httpClient, services } = await startServer();

    await services.users.createUser({
      email: "user@test.fr",
      password: "password",
      role: ROLES.ADMINISTRATOR,
    });

    const response = await httpClient.post("/api/login", {
      email: "INVALID",
      password: "password",
    });

    assert.equal(response.status, 401);
  });
});
