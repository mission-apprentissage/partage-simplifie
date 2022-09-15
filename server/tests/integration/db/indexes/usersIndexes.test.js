import { strict as assert } from "assert";
import { ROLES } from "../../../../src/common/constants/roles.js";
import { COLLECTIONS_NAMES } from "../../../../src/model/collections/index.js";
import { dbCollection } from "../../../../src/model/db/mongodbClient.js";
import { createIndexes } from "../../../../src/model/indexes/index.js";
import usersService from "../../../../src/services/usersService.js";

describe("Users Indexes", () => {
  let usersIndexes = null;

  beforeEach(async () => {
    // Crée un utilisateur de test dans la collection
    const { createUser } = usersService();

    await createUser({
      email: "user@test.fr",
      password: "password",
      role: ROLES.OF,
    });

    // Re-créé les indexs après l'ajout d'une entrée en base
    await createIndexes();
    usersIndexes = await dbCollection(COLLECTIONS_NAMES.Users).indexes();
  });

  it("Vérifie l'existence d'un index sur le champ _id", async () => {
    assert.equal(
      usersIndexes.some((item) => item.name === "_id_"),
      true
    );
  });

  it("Vérifie l'existence d'un index unique sur le champ email", async () => {
    assert.equal(
      usersIndexes.some((item) => item.name === "email"),
      true
    );
    assert.equal(usersIndexes.find((item) => item.name === "email")?.unique, true);
  });
});
