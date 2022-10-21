import { strict as assert } from "assert";
import { COLLECTIONS_NAMES } from "../../../src/model/collections/index.js";
import { dbCollection } from "../../../src/model/db/mongodbClient.js";
import { startServer } from "../../utils/testUtils.js";
import { ObjectId } from "mongodb";

describe("API Route DemandesActivationCompte", () => {
  describe("POST /demandes-activation-compte/", () => {
    it("renvoie une 200 quand l'email fourni est valide", async () => {
      const { httpClient } = await startServer();

      const email = "user1@test.fr";
      const response = await httpClient.post("/api/demandes-activation-compte", { email });
      assert.equal(response.status, 200);
      assert.equal(response.data.createdId !== null, true);

      const foundInDb = await dbCollection(COLLECTIONS_NAMES.DemandesActivationCompte).findOne({
        _id: new ObjectId(response.data.createdId),
      });

      assert.ok(foundInDb);
      assert.equal(foundInDb.email === email, true);
      assert.equal(foundInDb.created_at !== null, true);
    });

    it("renvoie une 400 quand aucun email n'est fourni", async () => {
      const { httpClient } = await startServer();

      const response = await httpClient.post("/api/demandes-activation-compte", {});
      assert.equal(response.status, 400);
      assert.equal(response.data.message, "Erreur de validation");
    });

    it("renvoie une 400 quand l'email fourni n'est pas au bon format", async () => {
      const { httpClient } = await startServer();

      const response = await httpClient.post("/api/demandes-activation-compte", { email: 123 });
      assert.equal(response.status, 400);
      assert.equal(response.data.message, "Erreur de validation");
    });
  });
});
