const assert = require("assert").strict;
const config = require("../../../config");
const { startServer } = require("../../utils/testUtils");

describe("API Route Healthcheck", () => {
  it("Vérifie que la route healthcheck fonctionne", async () => {
    const { httpClient } = await startServer();

    const response = await httpClient.get("/api/healthcheck");

    assert.equal(response.status, 200);
    assert.equal(response.data.name, `Serveur MNA - ${config.appName}`);
    assert.equal(response.data.healthcheck.mongodb, true);
    assert.ok(response.data.env);
    assert.ok(response.data.version);
  });
});
