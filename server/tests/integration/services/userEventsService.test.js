const assert = require("assert").strict;
const { COLLECTIONS_NAMES } = require("../../../src/model/collections");
const { dbCollection } = require("../../../src/model/db/mongodbClient");
const userEventsService = require("../../../src/services/userEventsService");

describe("Service UserEvents", () => {
  describe("create", () => {
    it("Permet de créer un userEvent et de le sauver en base", async () => {
      const { create } = userEventsService();

      await create({ username: "testUser", type: "any", data: { hello: "world" } });
      const foundInDb = await dbCollection(COLLECTIONS_NAMES.UserEvents).findOne({ username: "testUser" });

      assert.ok(foundInDb);

      assert.equal(foundInDb.username === "testUser", true);
      assert.equal(foundInDb.type === "any", true);
      assert.deepEqual(foundInDb.data, { hello: "world" });
      assert.equal(foundInDb.created_at !== null, true);
    });
  });
});
