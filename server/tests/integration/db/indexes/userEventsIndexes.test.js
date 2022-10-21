import { strict as assert } from "assert";
import { COLLECTIONS_NAMES } from "../../../../src/model/collections/index.js";
import { dbCollection } from "../../../../src/model/db/mongodbClient.js";

describe("UserEvents Indexes", async () => {
  let userEventsIndexes = null;

  beforeEach(async () => {
    userEventsIndexes = await dbCollection(COLLECTIONS_NAMES.UserEvents).indexes();
  });

  it("Vérifie l'existence d'un index sur le champ _id", async () => {
    assert.equal(
      userEventsIndexes.some((item) => item.name === "_id_"),
      true
    );
  });

  it("Vérifie l'existence d'un index sur le champ user_email", async () => {
    assert.equal(
      userEventsIndexes.some((item) => item.name === "user_email"),
      true
    );
  });
});
