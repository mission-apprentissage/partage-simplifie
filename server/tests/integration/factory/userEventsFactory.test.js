import { strict as assert } from "assert";
import { UserEventsFactory } from "../../../src/factory/userEventsFactory.js";

describe("Factory UserEvents", () => {
  describe("create", () => {
    it("Vérifie la création d'userEvent via sa factory", async () => {
      const entity = await UserEventsFactory.create({
        user_email: "testUser@test.fr",
        type: "any",
        data: { hello: "world" },
      });

      assert.equal(entity.user_email === "testUser@test.fr", true);
      assert.equal(entity.type === "any", true);
      assert.deepEqual(entity.data, { hello: "world" });
      assert.equal(entity.created_at !== null, true);
      assert.equal(entity.updated_at === null, true);
    });

    it("Vérifie la non création d'userEvent via sa factory si user_email au mauvais format", async () => {
      const entity = await UserEventsFactory.create({
        user_email: 12,
        type: "any",
        data: { hello: "world" },
      });

      assert.equal(entity === null, true);
    });

    it("Vérifie la non création d'userEvent via sa factory si user_email manquant", async () => {
      const entity = await UserEventsFactory.create({
        type: "any",
        data: { hello: "world" },
      });

      assert.equal(entity === null, true);
    });

    it("Vérifie la non création d'userEvent via sa factory si type au mauvais format", async () => {
      const entity = await UserEventsFactory.create({
        user_email: "testUser@test.fr",
        type: 12,
        data: { hello: "world" },
      });

      assert.equal(entity === null, true);
    });

    it("Vérifie la non création d'userEvent via sa factory si type manquant", async () => {
      const entity = await UserEventsFactory.create({
        user_email: "testUser@test.fr",
        data: { hello: "world" },
      });

      assert.equal(entity === null, true);
    });
  });
});
