import { strict as assert } from "assert";
import { COLLECTIONS_NAMES } from "../../../../src/model/collections/index.js";
import { dbCollection } from "../../../../src/model/db/mongodbClient.js";
import { createIndexes } from "../../../../src/model/indexes/index.js";

describe("DonneesApprenants Indexes", () => {
  let donneesApprenantsIndexes = null;

  beforeEach(async () => {
    await createIndexes();
    donneesApprenantsIndexes = await dbCollection(COLLECTIONS_NAMES.DonneesApprenants).indexes();
  });

  it("Vérifie l'existence d'un index sur le champ user_email", async () => {
    assert.equal(
      donneesApprenantsIndexes.some((item) => item.name === "user_email"),
      true
    );
  });
});
