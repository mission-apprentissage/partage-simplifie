import { strict as assert } from "assert";
import { DonneesApprenantsFactory } from "../../../src/factory/donneesApprenantsFactory.js";
import { toDonneesApprenantsFromXlsx } from "../../../src/model/api/donneesApprenantsMapper.js";
import { COLLECTIONS_NAMES } from "../../../src/model/collections/index.js";
import { dbCollection } from "../../../src/model/db/mongodbClient.js";
import {
  createSampleXlsxBuffer,
  createValidRandomXlsxDonneesApprenants,
  sampleDonneesApprenantsXlsx,
} from "../../utils/data/createRandomDonneesApprenants.js";
import donneesApprenantsService from "../../../src/services/donneesApprenantsService.js";
import { DONNEES_APPRENANT_XLSX_FIELDS } from "../../../src/domain/donneesApprenants.js";
import omit from "lodash.omit";

describe("Service DonneesApprenants", () => {
  describe("clearDonneesApprenantsForUserEmail", () => {
    it("Permet de supprimer les données apprenants lié à un user_email", async () => {
      const { clearDonneesApprenantsForUserEmail } = donneesApprenantsService();

      const userFields = {
        user_email: "test@test.fr",
        user_uai: "0000001X",
        user_siret: "00000000000002",
        user_nom_etablissement: "Super Etablissement",
      };

      const nbItems = 5;

      // Ajout via la factory de plusieurs donneesApprenants générées depuis un XLSX random
      for (let index = 0; index < nbItems; index++) {
        const sampleDonneesApprenantFromXlsx = toDonneesApprenantsFromXlsx(createValidRandomXlsxDonneesApprenants());
        const toAdd = await DonneesApprenantsFactory.create({ ...sampleDonneesApprenantFromXlsx, ...userFields });
        await dbCollection(COLLECTIONS_NAMES.DonneesApprenants).insertOne(toAdd);
      }

      const donneesApprenantsCount = await dbCollection(COLLECTIONS_NAMES.DonneesApprenants).count();
      assert.equal(donneesApprenantsCount === nbItems, true);

      // Suppression & test count === 0
      await clearDonneesApprenantsForUserEmail(userFields.user_email);
      const donneesApprenantsCountAfterDeletion = await dbCollection(COLLECTIONS_NAMES.DonneesApprenants).count();
      assert.equal(donneesApprenantsCountAfterDeletion === 0, true);
    });

    it("Permet de ne pas supprimer les données apprenants lié à un user_email si mauvais user fourni", async () => {
      const { clearDonneesApprenantsForUserEmail } = donneesApprenantsService();

      const userFields = {
        user_email: "test@test.fr",
        user_uai: "0000001X",
        user_siret: "00000000000002",
        user_nom_etablissement: "Super Etablissement",
      };

      const nbItems = 5;

      // Ajout via la factory de plusieurs donneesApprenants générées depuis un XLSX random
      for (let index = 0; index < nbItems; index++) {
        const sampleDonneesApprenantFromXlsx = toDonneesApprenantsFromXlsx(createValidRandomXlsxDonneesApprenants());
        const toAdd = await DonneesApprenantsFactory.create({ ...sampleDonneesApprenantFromXlsx, ...userFields });
        await dbCollection(COLLECTIONS_NAMES.DonneesApprenants).insertOne(toAdd);
      }

      const donneesApprenantsCount = await dbCollection(COLLECTIONS_NAMES.DonneesApprenants).count();
      assert.equal(donneesApprenantsCount === nbItems, true);

      // Suppression & test count === 0
      await clearDonneesApprenantsForUserEmail("badUser@test.fr");
      const donneesApprenantsCountAfterDeletion = await dbCollection(COLLECTIONS_NAMES.DonneesApprenants).count();
      assert.equal(donneesApprenantsCountAfterDeletion === nbItems, true);
    });
  });

  describe("readDonneesApprenantsFromXlsxBuffer", () => {
    it("Permet de lire sans erreur des données depuis un buffer de données XLSX", async () => {
      const { readDonneesApprenantsFromXlsxBuffer } = donneesApprenantsService();

      const buffer = await createSampleXlsxBuffer(sampleDonneesApprenantsXlsx);
      const donneesApprenants = readDonneesApprenantsFromXlsxBuffer(buffer, 1);

      assert.equal(donneesApprenants.length === sampleDonneesApprenantsXlsx.length, true);

      for (const key in donneesApprenants) {
        assert.equal(
          donneesApprenants[key][DONNEES_APPRENANT_XLSX_FIELDS.CFD] ===
            sampleDonneesApprenantsXlsx[key][DONNEES_APPRENANT_XLSX_FIELDS.CFD],
          true
        );

        assert.equal(
          donneesApprenants[key][DONNEES_APPRENANT_XLSX_FIELDS.AnneeScolaire] ===
            sampleDonneesApprenantsXlsx[key][DONNEES_APPRENANT_XLSX_FIELDS.AnneeScolaire],
          true
        );

        assert.equal(
          donneesApprenants[key][DONNEES_APPRENANT_XLSX_FIELDS.AnneeFormation] ===
            sampleDonneesApprenantsXlsx[key][DONNEES_APPRENANT_XLSX_FIELDS.AnneeFormation],
          true
        );
        assert.equal(
          donneesApprenants[key][DONNEES_APPRENANT_XLSX_FIELDS.NomApprenant] ===
            sampleDonneesApprenantsXlsx[key][DONNEES_APPRENANT_XLSX_FIELDS.NomApprenant],
          true
        );
        assert.equal(
          donneesApprenants[key][DONNEES_APPRENANT_XLSX_FIELDS.PrenomApprenant] ===
            sampleDonneesApprenantsXlsx[key][DONNEES_APPRENANT_XLSX_FIELDS.PrenomApprenant],
          true
        );
        assert.equal(
          donneesApprenants[key][DONNEES_APPRENANT_XLSX_FIELDS.DateDeNaissanceApprenant] ===
            sampleDonneesApprenantsXlsx[key][DONNEES_APPRENANT_XLSX_FIELDS.DateDeNaissanceApprenant],
          true
        );
        assert.equal(
          donneesApprenants[key][DONNEES_APPRENANT_XLSX_FIELDS.CodeRNCP] ===
            sampleDonneesApprenantsXlsx[key][DONNEES_APPRENANT_XLSX_FIELDS.CodeRNCP],
          true
        );
        assert.equal(
          donneesApprenants[key][DONNEES_APPRENANT_XLSX_FIELDS.TelephoneApprenant] ===
            sampleDonneesApprenantsXlsx[key][DONNEES_APPRENANT_XLSX_FIELDS.TelephoneApprenant],
          true
        );
        assert.equal(
          donneesApprenants[key][DONNEES_APPRENANT_XLSX_FIELDS.EmailApprenant] ===
            sampleDonneesApprenantsXlsx[key][DONNEES_APPRENANT_XLSX_FIELDS.EmailApprenant],
          true
        );
        assert.equal(
          donneesApprenants[key][DONNEES_APPRENANT_XLSX_FIELDS.IneApprenant] ===
            sampleDonneesApprenantsXlsx[key][DONNEES_APPRENANT_XLSX_FIELDS.IneApprenant],
          true
        );
        assert.equal(
          donneesApprenants[key][DONNEES_APPRENANT_XLSX_FIELDS.CodeCommuneInseeApprenant] ===
            sampleDonneesApprenantsXlsx[key][DONNEES_APPRENANT_XLSX_FIELDS.CodeCommuneInseeApprenant],
          true
        );
        assert.equal(
          donneesApprenants[key][DONNEES_APPRENANT_XLSX_FIELDS.DateInscription] ===
            sampleDonneesApprenantsXlsx[key][DONNEES_APPRENANT_XLSX_FIELDS.DateInscription],
          true
        );
        assert.equal(
          donneesApprenants[key][DONNEES_APPRENANT_XLSX_FIELDS.DateDebutContrat] ===
            sampleDonneesApprenantsXlsx[key][DONNEES_APPRENANT_XLSX_FIELDS.DateDebutContrat],
          true
        );
        assert.equal(
          donneesApprenants[key][DONNEES_APPRENANT_XLSX_FIELDS.DateSortieFormation] ===
            sampleDonneesApprenantsXlsx[key][DONNEES_APPRENANT_XLSX_FIELDS.DateSortieFormation],
          true
        );
      }
    });
  });

  describe("importDonneesApprenants", () => {
    it("Permet d'importer sans erreur des données depuis un buffer de données XLSX", async () => {
      const { importDonneesApprenants } = donneesApprenantsService();

      const userFields = {
        user_email: "test@test.fr",
        user_uai: "0000001X",
        user_siret: "00000000000002",
        user_nom_etablissement: "Super Etablissement",
      };

      const nbItems = 10;

      const donneesApprenants = [];
      for (let index = 0; index < nbItems; index++) {
        donneesApprenants.push({
          ...toDonneesApprenantsFromXlsx(createValidRandomXlsxDonneesApprenants()),
          ...userFields,
        });
      }

      // Verification du nombre d'éléments avant ajout pour l'user dans la db
      const donneesApprenantsCountForUserBefore = await dbCollection(COLLECTIONS_NAMES.DonneesApprenants).count({
        user_email: userFields?.user_email,
      });
      assert.equal(donneesApprenantsCountForUserBefore === 0, true);

      await importDonneesApprenants(donneesApprenants);

      // Verification du nombre d'éléments après ajout pour l'user dans la db
      const donneesApprenantsListForUserAfter = await dbCollection(COLLECTIONS_NAMES.DonneesApprenants)
        .find({
          user_email: userFields?.user_email,
        })
        .toArray();

      assert.equal(donneesApprenantsListForUserAfter.length === nbItems, true);

      for (const key in donneesApprenantsListForUserAfter) {
        const donneesApprenantInDb = donneesApprenantsListForUserAfter[key];
        assert.deepEqual(omit(donneesApprenantInDb, ["created_at", "updated_at", "_id"]), donneesApprenants[key]);
      }
    });
  });
});
