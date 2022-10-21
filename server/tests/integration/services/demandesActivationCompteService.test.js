import { strict as assert } from "assert";
import demandesActivationCompteService from "../../../src/services/demandesActivationCompteService.js";
import { dbCollection } from "../../../src/model/db/mongodbClient.js";
import { COLLECTIONS_NAMES } from "../../../src/model/collections/index.js";

describe("Service DemandesActivationCompte", () => {
  describe("createDemandeActivationCompte", () => {
    it("Permet de créer une demande d'activation de compte et de le sauver en base", async () => {
      const { createDemandeActivationCompte } = demandesActivationCompteService();

      const insertedId = await createDemandeActivationCompte("test@test.fr");
      const foundInDb = await dbCollection(COLLECTIONS_NAMES.DemandesActivationCompte).findOne({
        _id: insertedId,
      });

      assert.ok(foundInDb);

      assert.equal(foundInDb.email === "test@test.fr", true);
      assert.equal(foundInDb.created_at !== null, true);
    });

    it("Ne créé pas de demande d'activation de compte si l'email est au mauvais format", async () => {
      const { createDemandeActivationCompte } = demandesActivationCompteService();

      await createDemandeActivationCompte(123);
      const foundInDb = await dbCollection(COLLECTIONS_NAMES.DemandesActivationCompte).findOne({
        email: "test@test.fr",
      });

      assert.equal(foundInDb === null, true);
    });
  });
});
