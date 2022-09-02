import { strict as assert } from "assert";
import { createUserToken } from "../../../../src/common/utils/jwtUtils.js";
import jwt from "jsonwebtoken";
import { config } from "../../../../config/index.js";

describe("createUserToken", () => {
  it("crée un token pour un utilisateur valide avec le bon JWT_SECRET", () => {
    const testRole = "testRole";
    const testEmail = "testEmail@test.fr";
    const testEtablissement = "testEtablissement";

    const user = {
      role: testRole,
      email: testEmail,
      nom_etablissement: testEtablissement,
    };

    const token = createUserToken(user);
    assert.equal(token !== null, true);
    const decoded = jwt.verify(token, config.auth.user.jwtSecret);
    assert.ok(decoded.iat);
    assert.ok(decoded.exp);
    assert.equal(decoded.sub === testEmail, true);
    assert.equal(decoded.iss === config.appName, true);
    assert.equal(decoded.role === testRole, true);
    assert.equal(decoded.nom_etablissement === testEtablissement, true);
  });

  it("ne crée pas un token pour un utilisateur valide si le JWT_SECRET n'est pas bon", () => {
    const testRole = "testRole";
    const testEmail = "testEmail@test.fr";
    const testEtablissement = "testEtablissement";

    const user = {
      role: testRole,
      email: testEmail,
      nom_etablissement: testEtablissement,
    };

    const token = createUserToken(user);
    assert.equal(token !== null, true);
    assert.throws(() => jwt.verify(token, "BAD_SECRET"));
  });
});
