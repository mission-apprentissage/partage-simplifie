import { strict as assert } from "assert";
import { createToken, createUserToken } from "../../../../src/common/utils/jwtUtils.js";
import jwt from "jsonwebtoken";
import { config } from "../../../../config/index.js";

describe("createToken", () => {
  it("crée un token générique valide avec le bon JWT_SECRET", () => {
    const JWT_SECRET = "123";
    const type = "TestType";
    const subject = "TestSub";
    const payload = {
      field1: "test1",
      field2: "test2",
    };
    const options = {
      secret: JWT_SECRET,
      expiresIn: "1000",
      payload,
    };

    const token = createToken(type, subject, options);
    assert.equal(token !== null, true);
    const decoded = jwt.verify(token, JWT_SECRET);
    assert.ok(decoded.iat);
    assert.ok(decoded.exp);
    assert.equal(decoded.sub === subject, true);
    assert.equal(decoded.iss === config.appName, true);
    assert.equal(decoded.field1 === "test1", true);
    assert.equal(decoded.field2 === "test2", true);
  });

  it("ne crée pas un token générique valide si le JWT_SECRET n'est pas bon", () => {
    const JWT_SECRET = "123";
    const type = "TestType";
    const subject = "TestSub";
    const payload = {
      field1: "test1",
      field2: "test2",
    };
    const options = {
      secret: JWT_SECRET,
      expiresIn: "1000",
      payload,
    };

    const token = createToken(type, subject, options);
    assert.equal(token !== null, true);
    assert.throws(() => jwt.verify(token, "BAD_SECRET"));
  });
});

describe("createUserToken", () => {
  it("crée un token pour un utilisateur valide avec le bon JWT_SECRET", () => {
    const testRole = "testRole";
    const testUsername = "testUsername";
    const testEtablissement = "testEtablissement";

    const user = {
      role: testRole,
      username: testUsername,
      nom_etablissement: testEtablissement,
    };

    const token = createUserToken(user);
    assert.equal(token !== null, true);
    const decoded = jwt.verify(token, config.auth.user.jwtSecret);
    assert.ok(decoded.iat);
    assert.ok(decoded.exp);
    assert.equal(decoded.sub === testUsername, true);
    assert.equal(decoded.iss === config.appName, true);
    assert.equal(decoded.role === testRole, true);
    assert.equal(decoded.nom_etablissement === testEtablissement, true);
  });

  it("ne crée pas un token pour un utilisateur valide si le JWT_SECRET n'est pas bon", () => {
    const testRole = "testRole";
    const testUsername = "testUsername";
    const testEtablissement = "testEtablissement";

    const user = {
      role: testRole,
      username: testUsername,
      nom_etablissement: testEtablissement,
    };

    const token = createUserToken(user);
    assert.equal(token !== null, true);
    assert.throws(() => jwt.verify(token, "BAD_SECRET"));
  });
});
