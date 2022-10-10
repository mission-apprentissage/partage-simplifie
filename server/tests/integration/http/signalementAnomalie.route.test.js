import { strict as assert } from "assert";
import { COLLECTIONS_NAMES } from "../../../src/model/collections/index.js";
import { dbCollection } from "../../../src/model/db/mongodbClient.js";
import { startServer } from "../../utils/testUtils.js";
import { ObjectId } from "mongodb";

describe("API Route SignalementAnomalie", () => {
  describe("POST /signalementAnomalie/", () => {
    it("renvoie une 200 quand l'email et le message fourni est valide", async () => {
      const { httpClient } = await startServer();

      const email = "user1@test.fr";
      const message = "Je suis une anomalie";
      const response = await httpClient.post("/api/signalementAnomalie", { email, message });
      assert.equal(response.status, 200);
      assert.equal(response.data.createdId !== null, true);

      const foundInDb = await dbCollection(COLLECTIONS_NAMES.SignalementAnomalie).findOne({
        _id: new ObjectId(response.data.createdId),
      });

      assert.ok(foundInDb);
      assert.equal(foundInDb.email === email, true);
      assert.equal(foundInDb.message === message, true);
      assert.equal(foundInDb.created_at !== null, true);
    });
  });
});
