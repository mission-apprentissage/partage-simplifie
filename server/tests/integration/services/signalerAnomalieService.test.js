import { strict as assert } from "assert";
import signalerAnomalieService from "../../../src/services/signalerAnomalieService.js";
import { dbCollection } from "../../../src/model/db/mongodbClient.js";
import { COLLECTIONS_NAMES } from "../../../src/model/collections/index.js";

describe("Service AnomalyMessage", () => {
  describe("createAnomalyMessage", () => {
    it("Permet de créer un message pour prevenir d'une anomalie et de le sauver en base", async () => {
      const { createSignalerAnomalie } = signalerAnomalieService();

      const insertedId = await createSignalerAnomalie("test@test.fr", "Je suis une anomalie");
      const foundInDb = await dbCollection(COLLECTIONS_NAMES.SignalerAnomalie).findOne({
        _id: insertedId,
      });

      assert.ok(foundInDb);

      assert.equal(foundInDb.email === "test@test.fr", true);
      assert.equal(foundInDb.message === "Je suis une anomalie", true);
      assert.equal(foundInDb.created_at !== null, true);
    });
  });
});
