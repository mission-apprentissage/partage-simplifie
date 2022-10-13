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

    it("renvoie une erreur HTTP 400 lorsque qu'il maque un ou plusieurs parametres", async () => {
      const { httpClient } = await startServer();
      const email = "user1@test.fr";
      const message = "Je suis une anomalie";

      const response = await httpClient.post("/api/signalementAnomalie", {});
      const responseOnlyEmail = await httpClient.post("/api/signalementAnomalie", { email });
      const responseOnlyMessage = await httpClient.post("/api/signalementAnomalie", { message });

      assert.equal(response.status, 400);
      assert.equal(responseOnlyEmail.status, 400);
      assert.equal(responseOnlyMessage.status, 400);
    });

    it("renvoie une erreur HTTP 400 lorsque que le format d'un parametre est invalide", async () => {
      const { httpClient } = await startServer();
      const email = "user1@test.fr";
      const message = 'Je suis une anomalie"';
      const invalideEmail = "user1";
      const invalideMessage = 23232;

      const responseInvalideMessage = await httpClient.post("/api/signalementAnomalie", { email, invalideMessage });
      const responseInvalideEmail = await httpClient.post("/api/signalementAnomalie", { invalideEmail, message });

      assert.equal(responseInvalideMessage.status, 400);
      assert.equal(responseInvalideEmail.status, 400);
    });
  });
});
