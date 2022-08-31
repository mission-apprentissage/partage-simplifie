import { strict as assert } from "assert";
import { INEXISTANT_UAI, sampleOrganismeFromReferentiel } from "../../utils/nockApis/apiReferentielMna/data.js";
import { startServer } from "../../utils/testUtils.js";

describe("API Route Organismes", () => {
  it("renvoie une 400 quand l'uai n'est pas au bon format", async () => {
    const { httpClient } = await startServer();

    const response = await httpClient.get("/api/organismes", { params: { uai: "badFormat" } });
    assert.equal(response.status, 400);
    assert.equal(response.data.message, "Erreur de validation");
  });

  it("renvoie une 200 avec le bon organisme quand l'uai est valide", async () => {
    const { httpClient } = await startServer();

    const response = await httpClient.get("/api/organismes", { params: { uai: "0921500F" } });
    assert.equal(response.status, 200);
    assert.equal(response.data.organisme !== null, true);
    assert.equal(response.data.organisme.uai === sampleOrganismeFromReferentiel.organismes[0].uai, true);
    assert.equal(response.data.organisme.siret === sampleOrganismeFromReferentiel.organismes[0].siret, true);
    assert.equal(response.data.organisme.adresse === sampleOrganismeFromReferentiel.organismes[0].adresse?.label, true);
    assert.equal(
      response.data.organisme.nom_etablissement === sampleOrganismeFromReferentiel.organismes[0].raison_sociale,
      true
    );
  });

  it("renvoie une 200 avec un organisme null quand l'uai est inexistant", async () => {
    const { httpClient } = await startServer();

    const response = await httpClient.get("/api/organismes", { params: { uai: INEXISTANT_UAI } });
    assert.equal(response.status, 200);
    assert.equal(response.data.organisme === null, true);
  });
});
