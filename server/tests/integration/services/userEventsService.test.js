import { strict as assert } from "assert";
import { COLLECTIONS_NAMES } from "../../../src/model/collections/index.js";
import { dbCollection } from "../../../src/model/db/mongodbClient.js";
import userEventsService from "../../../src/services/userEventsService.js";

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
