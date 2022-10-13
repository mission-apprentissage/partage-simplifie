import { strict as assert } from "assert";
import signalementAnomalieService from "../../../src/services/signalementAnomalieService.js";
import { dbCollection } from "../../../src/model/db/mongodbClient.js";
import { COLLECTIONS_NAMES } from "../../../src/model/collections/index.js";

describe("Service SignalementAnomalyMessage", () => {
  describe("createSignalementAnomalyMessage", () => {
    it("Permet de créer un message pour prevenir d'une anomalie et de le sauver en base", async () => {
      const { createSignalementAnomalie } = signalementAnomalieService();

      const insertedId = await createSignalementAnomalie("test@test.fr", "Je suis une anomalie");
      const foundInDb = await dbCollection(COLLECTIONS_NAMES.SignalementAnomalie).findOne({
        _id: insertedId,
      });

      assert.ok(foundInDb);

      assert.equal(foundInDb.email === "test@test.fr", true);
      assert.equal(foundInDb.message === "Je suis une anomalie", true);
      assert.equal(foundInDb.created_at !== null, true);
    });

    it("Ne créé pas de un message pour prevenir d'une anomalie si le message est au mauvais format", async () => {
      const { createSignalementAnomalie } = signalementAnomalieService();

      const insertedIdInvalideMessage = await createSignalementAnomalie("test@test.fr", 123);

      const foundInDbInvalideMessage = await dbCollection(COLLECTIONS_NAMES.SignalementAnomalie).findOne({
        _id: insertedIdInvalideMessage,
      });

      assert.equal(foundInDbInvalideMessage === null, true);
    });

    it("Ne créé pas de un message pour prevenir d'une anomalie si l'email est au mauvais format", async () => {
      const { createSignalementAnomalie } = signalementAnomalieService();

      const insertedIdInvalideEmail = await createSignalementAnomalie("tes", "Je suis une anomalie");

      const foundInDbInvalideEmail = await dbCollection(COLLECTIONS_NAMES.SignalementAnomalie).findOne({
        _id: insertedIdInvalideEmail,
      });

      assert.equal(foundInDbInvalideEmail === null, true);
    });
  });
});
