import { strict as assert } from "assert";
import { UserEventsFactory } from "../../../src/factory/userEventsFactory.js";

describe("Factory UserEvents", () => {
  describe("create", () => {
    it("Vérifie la création d'userEvent via sa factory", async () => {
      const entity = await UserEventsFactory.create({ username: "testUser", type: "any", data: { hello: "world" } });

      assert.equal(entity.username === "testUser", true);
      assert.equal(entity.type === "any", true);
      assert.deepEqual(entity.data, { hello: "world" });
      assert.equal(entity.created_at !== null, true);
      assert.equal(entity.updated_at === null, true);
    });
  });
});
