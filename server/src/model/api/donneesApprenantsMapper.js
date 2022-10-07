/**
 * Mapping des Données Apprenants XLSX vers la collection DonneesApprenants
 */

import { parseFormattedDate } from "../../domain/date.js";
import { DONNEES_APPRENANT_XLSX_FIELDS } from "../../domain/donneesApprenants.js";

export const toDonneesApprenantsFromXlsx = (donneesApprenantsXlsx) => {
  const mapped = {
    cfd: donneesApprenantsXlsx[DONNEES_APPRENANT_XLSX_FIELDS.CFD],
    annee_scolaire: donneesApprenantsXlsx[DONNEES_APPRENANT_XLSX_FIELDS.AnneeScolaire],
    annee_formation: donneesApprenantsXlsx[DONNEES_APPRENANT_XLSX_FIELDS.AnneeFormation],
    nom_apprenant: donneesApprenantsXlsx[DONNEES_APPRENANT_XLSX_FIELDS.NomApprenant],
    prenom_apprenant: donneesApprenantsXlsx[DONNEES_APPRENANT_XLSX_FIELDS.PrenomApprenant],
    date_de_naissance_apprenant: parseFormattedDate(
      donneesApprenantsXlsx[DONNEES_APPRENANT_XLSX_FIELDS.DateDeNaissanceApprenant]
    ),
    code_rncp: donneesApprenantsXlsx[DONNEES_APPRENANT_XLSX_FIELDS.CodeRNCP],
    telephone_apprenant: donneesApprenantsXlsx[DONNEES_APPRENANT_XLSX_FIELDS.TelephoneApprenant],
    email_apprenant: donneesApprenantsXlsx[DONNEES_APPRENANT_XLSX_FIELDS.EmailApprenant],
    ine_apprenant: donneesApprenantsXlsx[DONNEES_APPRENANT_XLSX_FIELDS.IneApprenant],
    code_commune_insee_apprenant: donneesApprenantsXlsx[DONNEES_APPRENANT_XLSX_FIELDS.CodeCommuneInseeApprenant],
  };

  const parsedDateInscription = parseFormattedDate(
    donneesApprenantsXlsx[DONNEES_APPRENANT_XLSX_FIELDS.DateInscription]
  );
  const parsedDateContrat = parseFormattedDate(donneesApprenantsXlsx[DONNEES_APPRENANT_XLSX_FIELDS.DateContrat]);
  const parsedDateSortieFormation = parseFormattedDate(
    donneesApprenantsXlsx[DONNEES_APPRENANT_XLSX_FIELDS.DateSortieFormation]
  );

  if (parsedDateInscription !== null) mapped.date_inscription = parsedDateInscription;
  if (parsedDateContrat !== null) mapped.date_contrat = parsedDateContrat;
  if (parsedDateSortieFormation !== null) mapped.date_sortie_formation = parsedDateSortieFormation;

  return mapped;
};

export const CODES_STATUT_APPRENANT = {
  inscrit: 2,
  apprenti: 3,
  abandon: 0,
};

export const toDossiersApprenantsList = (donneesApprenant) => {
  let dossiersApprenantsList = [];

  // Build common dossierApprenantFields
  const currentDossierApprenant = {};

  // Champs obligatoires
  currentDossierApprenant.nom_apprenant = donneesApprenant.nom_apprenant;
  currentDossierApprenant.prenom_apprenant = donneesApprenant.prenom_apprenant;
  currentDossierApprenant.date_de_naissance_apprenant = donneesApprenant.date_de_naissance_apprenant;
  currentDossierApprenant.uai_etablissement = donneesApprenant.user_uai;
  currentDossierApprenant.nom_etablissement = donneesApprenant.user_nom_etablissement;
  currentDossierApprenant.id_formation = donneesApprenant.cfd;
  currentDossierApprenant.annee_scolaire = donneesApprenant.annee_scolaire;

  // Champs optionnels
  currentDossierApprenant.ine_apprenant = donneesApprenant.ine_apprenant;
  currentDossierApprenant.id_erp_apprenant = donneesApprenant._id;
  currentDossierApprenant.email_contact = donneesApprenant.email_apprenant;
  currentDossierApprenant.tel_apprenant = donneesApprenant.telephone_apprenant;
  currentDossierApprenant.code_commune_insee_apprenant = donneesApprenant.code_commune_insee_apprenant;
  currentDossierApprenant.siret_etablissement = donneesApprenant.user_siret;

  // currentDossierApprenant.libelle_long_formation = donneesApprenant.xxxxxx; -- Missing
  currentDossierApprenant.formation_rncp = donneesApprenant.code_rncp;
  // currentDossierApprenant.periode_formation = donneesApprenant.xxxxx; -- Missing
  currentDossierApprenant.annee_formation = donneesApprenant.annee_formation;

  // Evènements des dates de contrat
  currentDossierApprenant.contrat_date_debut = donneesApprenant.date_contrat;
  // currentDossierApprenant.contrat_date_fin = donneesApprenant.xxxxx; -- On ne remplis pas la date de fin car on ne l'a pas
  currentDossierApprenant.contrat_date_rupture = donneesApprenant.date_sortie_formation;

  // S'il existe une date d'inscription , on ajoute à la liste un dossierApprenant correspondant au statut inscrit avec la date d'inscription
  if (donneesApprenant.date_inscription) {
    const dossierInscrit = {
      ...currentDossierApprenant,
      statut_apprenant: CODES_STATUT_APPRENANT.inscrit,
      date_metier_mise_a_jour_statut: donneesApprenant.date_inscription,
    };

    dossiersApprenantsList.push(dossierInscrit);
  }

  // S'il existe une date de contrat, on ajoute à la liste un dossierApprenant correspondant au statut apprenti avec la date de contrat
  if (donneesApprenant.date_contrat) {
    const dossierApprenti = {
      ...currentDossierApprenant,
      statut_apprenant: CODES_STATUT_APPRENANT.apprenti,
      date_metier_mise_a_jour_statut: donneesApprenant.date_contrat,
    };

    dossiersApprenantsList.push(dossierApprenti);
  }

  // S'il existe une date de sortie de formation, on ajoute à la liste un dossierApprenant correspondant au statut abandon avec la date de sortie de formation
  if (donneesApprenant.date_sortie_formation) {
    const dossierAbandon = {
      ...currentDossierApprenant,
      statut_apprenant: CODES_STATUT_APPRENANT.abandon,
      date_metier_mise_a_jour_statut: donneesApprenant.date_sortie_formation,
    };

    dossiersApprenantsList.push(dossierAbandon);
  }

  return dossiersApprenantsList;
};
