import { strict as assert } from "assert";
import { COLLECTIONS_NAMES } from "../../../../src/model/collections/index.js";
import { dbCollection } from "../../../../src/model/db/mongodbClient.js";
import demandesActivationCompteService from "../../../../src/services/demandesActivationCompteService.js";
import { createIndexes } from "../../../../src/model/indexes/index.js";

describe("DemandeActivationCompte Indexes", () => {
  let demandeActivationCompteIndexes = null;

  beforeEach(async () => {
    // Crée une entrée en base
    const { createDemandeActivationCompte } = demandesActivationCompteService();
    await createDemandeActivationCompte("test@test.fr");

    // Re-créé les indexs après l'ajout d'une entrée en base
    await createIndexes();
    demandeActivationCompteIndexes = await dbCollection(COLLECTIONS_NAMES.DemandesActivationCompte).indexes();
  });

  it("Vérifie l'existence d'un index sur le champ email", async () => {
    assert.equal(
      demandeActivationCompteIndexes.some((item) => item.name === "email"),
      true
    );
  });
});
