import { strict as assert } from "assert";
import { format } from "date-fns";
import { parseFormattedDate } from "../../../../src/domain/date.js";
import { DONNEES_APPRENANT_XLSX_FIELDS } from "../../../../src/domain/donneesApprenants.js";
import { toDonneesApprenantsFromXlsx } from "../../../../src/model/api/donneesApprenantsXlsxMapper.js";
import { createRandomXlsxDonneesApprenant } from "../../../utils/data/createRandomDonneesApprenants.js";

describe("Mapper DonneesApprenantsXlsx", () => {
  describe("toDonneesApprenantsFromXlsx", () => {
    it("Vérifie le mapping d'un objet XLSX avec tous les champs obligatoires vers DossierApprenants", async () => {
      const randomXlsxDonneesApprenant = createRandomXlsxDonneesApprenant();

      // Vérification de la génération
      assert.equal(randomXlsxDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.CFD] !== undefined, true);
      assert.equal(randomXlsxDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.AnneeScolaire] !== undefined, true);
      assert.equal(randomXlsxDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.AnneeFormation] !== undefined, true);
      assert.equal(randomXlsxDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.NomApprenant] !== undefined, true);
      assert.equal(randomXlsxDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.PrenomApprenant] !== undefined, true);
      assert.equal(
        randomXlsxDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.DateDeNaissanceApprenant] !== undefined,
        true
      );

      // Vérification du mapping
      const mappedDonneesApprenant = toDonneesApprenantsFromXlsx(randomXlsxDonneesApprenant);

      assert.equal(mappedDonneesApprenant.cfd === randomXlsxDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.CFD], true);
      assert.equal(
        mappedDonneesApprenant.annee_scolaire ===
          randomXlsxDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.AnneeScolaire],
        true
      );
      assert.equal(
        mappedDonneesApprenant.annee_formation ===
          randomXlsxDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.AnneeFormation],
        true
      );
      assert.equal(
        mappedDonneesApprenant.nom_apprenant === randomXlsxDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.NomApprenant],
        true
      );
      assert.equal(
        mappedDonneesApprenant.prenom_apprenant ===
          randomXlsxDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.PrenomApprenant],
        true
      );
      assert.equal(
        mappedDonneesApprenant.date_de_naissance_apprenant.getTime() ===
          parseFormattedDate(
            randomXlsxDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.DateDeNaissanceApprenant]
          ).getTime(),
        true
      );
    });

    it("Vérifie le mapping d'un objet XLSX avec tous les champs obligatoires et facultatifs vers DossierApprenants", async () => {
      const optionalFields = {};
      optionalFields[DONNEES_APPRENANT_XLSX_FIELDS.CodeRNCP] = "RNCP12345";
      optionalFields[DONNEES_APPRENANT_XLSX_FIELDS.TelephoneApprenant] = "0618224455";
      optionalFields[DONNEES_APPRENANT_XLSX_FIELDS.EmailApprenant] = "test@email.fr";
      optionalFields[DONNEES_APPRENANT_XLSX_FIELDS.IneApprenant] = "111111111XX";
      optionalFields[DONNEES_APPRENANT_XLSX_FIELDS.CodeCommuneInseeApprenant] = "31555";

      const DATE_FORMAT = "dd-MM-yyyy";

      optionalFields[DONNEES_APPRENANT_XLSX_FIELDS.DateInscription] = format(
        new Date("2022-10-01"),
        DATE_FORMAT
      ).toString();

      optionalFields[DONNEES_APPRENANT_XLSX_FIELDS.DateContrat] = format(
        new Date("2022-10-05"),
        DATE_FORMAT
      ).toString();

      optionalFields[DONNEES_APPRENANT_XLSX_FIELDS.DateSortieFormation] = format(
        new Date("2022-10-10"),
        DATE_FORMAT
      ).toString();

      // Vérification de la génération
      const randomXlsxDonneesApprenant = createRandomXlsxDonneesApprenant(optionalFields);

      assert.equal(randomXlsxDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.CFD] !== undefined, true);
      assert.equal(randomXlsxDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.AnneeScolaire] !== undefined, true);
      assert.equal(randomXlsxDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.AnneeFormation] !== undefined, true);
      assert.equal(randomXlsxDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.NomApprenant] !== undefined, true);
      assert.equal(randomXlsxDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.PrenomApprenant] !== undefined, true);
      assert.equal(
        randomXlsxDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.DateDeNaissanceApprenant] !== undefined,
        true
      );
      assert.equal(randomXlsxDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.CodeRNCP] !== undefined, true);
      assert.equal(randomXlsxDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.TelephoneApprenant] !== undefined, true);
      assert.equal(randomXlsxDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.EmailApprenant] !== undefined, true);
      assert.equal(randomXlsxDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.IneApprenant] !== undefined, true);
      assert.equal(
        randomXlsxDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.CodeCommuneInseeApprenant] !== undefined,
        true
      );
      assert.equal(randomXlsxDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.DateInscription] !== undefined, true);
      assert.equal(randomXlsxDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.DateContrat] !== undefined, true);
      assert.equal(randomXlsxDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.DateSortieFormation] !== undefined, true);

      // Vérification du mapping
      const mappedDonneesApprenant = toDonneesApprenantsFromXlsx(randomXlsxDonneesApprenant);

      assert.equal(mappedDonneesApprenant.cfd === randomXlsxDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.CFD], true);
      assert.equal(
        mappedDonneesApprenant.annee_scolaire ===
          randomXlsxDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.AnneeScolaire],
        true
      );
      assert.equal(
        mappedDonneesApprenant.annee_formation ===
          randomXlsxDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.AnneeFormation],
        true
      );
      assert.equal(
        mappedDonneesApprenant.nom_apprenant === randomXlsxDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.NomApprenant],
        true
      );
      assert.equal(
        mappedDonneesApprenant.prenom_apprenant ===
          randomXlsxDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.PrenomApprenant],
        true
      );
      assert.equal(
        mappedDonneesApprenant.date_de_naissance_apprenant.getTime() ===
          parseFormattedDate(
            randomXlsxDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.DateDeNaissanceApprenant]
          ).getTime(),
        true
      );

      assert.equal(
        mappedDonneesApprenant.code_rncp === randomXlsxDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.CodeRNCP],
        true
      );
      assert.equal(
        mappedDonneesApprenant.telephone_apprenant ===
          randomXlsxDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.TelephoneApprenant],
        true
      );
      assert.equal(
        mappedDonneesApprenant.email_apprenant ===
          randomXlsxDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.EmailApprenant],
        true
      );
      assert.equal(
        mappedDonneesApprenant.ine_apprenant === randomXlsxDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.IneApprenant],
        true
      );
      assert.equal(
        mappedDonneesApprenant.code_commune_insee_apprenant ===
          randomXlsxDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.CodeCommuneInseeApprenant],
        true
      );

      assert.equal(
        mappedDonneesApprenant.date_inscription.getTime() ===
          parseFormattedDate(randomXlsxDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.DateInscription]).getTime(),
        true
      );
      assert.equal(
        mappedDonneesApprenant.date_contrat.getTime() ===
          parseFormattedDate(randomXlsxDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.DateContrat]).getTime(),
        true
      );
      assert.equal(
        mappedDonneesApprenant.date_sortie_formation.getTime() ===
          parseFormattedDate(randomXlsxDonneesApprenant[DONNEES_APPRENANT_XLSX_FIELDS.DateSortieFormation]).getTime(),
        true
      );
    });
  });
});
