import { strict as assert } from "assert";
import {
  INEXISTANT_UAI,
  SAMPLE_UAI_MULTIPLES_ORGANISMES,
  SAMPLE_UAI_UNIQUE_ORGANISME,
  sampleUniqueOrganismeFromReferentiel,
  sampleMultiplesOrganismesFromReferentiel,
} from "../../utils/nockApis/apiReferentielMna/data.js";
import { startServer } from "../../utils/testUtils.js";

describe("API Route Organismes", () => {
  it("renvoie une 400 quand l'uai n'est pas au bon format", async () => {
    const { httpClient } = await startServer();

    const response = await httpClient.get("/api/organismes", { params: { uai: "badFormat" } });
    assert.equal(response.status, 400);
    assert.equal(response.data.message, "Erreur de validation");
  });

  it("renvoie une 200 avec une liste d'organismes vides quand l'uai est inexistant", async () => {
    const { httpClient } = await startServer();

    const response = await httpClient.get("/api/organismes", { params: { uai: INEXISTANT_UAI } });
    assert.equal(response.status, 200);
    assert.equal(response.data.organismes.length === 0, true);
  });

  it("renvoie une 200 avec une liste d'un seul bon organisme quand l'uai est valide", async () => {
    const { httpClient } = await startServer();

    const response = await httpClient.get("/api/organismes", { params: { uai: SAMPLE_UAI_UNIQUE_ORGANISME } });
    assert.equal(response.status, 200);
    assert.equal(response.data.organismes !== null, true);
    assert.equal(response.data.organismes.length === 1, true);

    assert.equal(response.data.organismes[0].uai === sampleUniqueOrganismeFromReferentiel.organismes[0].uai, true);
    assert.equal(response.data.organismes[0].siret === sampleUniqueOrganismeFromReferentiel.organismes[0].siret, true);
    assert.equal(
      response.data.organismes[0].adresse === sampleUniqueOrganismeFromReferentiel.organismes[0].adresse?.label,
      true
    );
    assert.equal(
      response.data.organismes[0].nom_etablissement ===
        sampleUniqueOrganismeFromReferentiel.organismes[0].raison_sociale,
      true
    );
  });

  it("renvoie une 200 avec une liste de plusieurs organismes quand l'uai est valide", async () => {
    const { httpClient } = await startServer();

    const response = await httpClient.get("/api/organismes", { params: { uai: SAMPLE_UAI_MULTIPLES_ORGANISMES } });
    assert.equal(response.status, 200);
    assert.equal(response.data.organismes !== null, true);
    assert.equal(response.data.organismes.length === 2, true);

    // 1er élément
    assert.equal(response.data.organismes[0].uai === sampleMultiplesOrganismesFromReferentiel.organismes[0].uai, true);
    assert.equal(
      response.data.organismes[0].siret === sampleMultiplesOrganismesFromReferentiel.organismes[0].siret,
      true
    );
    assert.equal(
      response.data.organismes[0].adresse === sampleMultiplesOrganismesFromReferentiel.organismes[0].adresse?.label,
      true
    );
    assert.equal(
      response.data.organismes[0].nom_etablissement ===
        sampleMultiplesOrganismesFromReferentiel.organismes[0].raison_sociale,
      true
    );

    // 2e élément
    assert.equal(response.data.organismes[1].uai === sampleMultiplesOrganismesFromReferentiel.organismes[1].uai, true);
    assert.equal(
      response.data.organismes[1].siret === sampleMultiplesOrganismesFromReferentiel.organismes[1].siret,
      true
    );
    assert.equal(
      response.data.organismes[1].adresse === sampleMultiplesOrganismesFromReferentiel.organismes[1].adresse?.label,
      true
    );
    assert.equal(
      response.data.organismes[1].nom_etablissement ===
        sampleMultiplesOrganismesFromReferentiel.organismes[1].raison_sociale,
      true
    );
  });
});
