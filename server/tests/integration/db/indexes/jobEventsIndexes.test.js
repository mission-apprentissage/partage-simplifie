import { strict as assert } from "assert";
import { COLLECTIONS_NAMES } from "../../../../src/model/collections/index.js";
import { dbCollection } from "../../../../src/model/db/mongodbClient.js";

describe("JobEvents Indexes", () => {
  let jobEventsIndexes = null;

  beforeEach(async () => {
    jobEventsIndexes = await dbCollection(COLLECTIONS_NAMES.JobEvents).indexes();
  });

  it("Vérifie l'existence d'un index sur le champ _id", async () => {
    assert.equal(
      jobEventsIndexes.some((item) => item.name === "_id_"),
      true
    );
  });

  it("Vérifie l'existence d'un index sur le champ jobname", async () => {
    assert.equal(
      jobEventsIndexes.some((item) => item.name === "jobname"),
      true
    );
  });

  it("Vérifie l'existence d'un index sur le champ action", async () => {
    assert.equal(
      jobEventsIndexes.some((item) => item.name === "action"),
      true
    );
  });
});
