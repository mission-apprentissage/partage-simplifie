/**
 * Mapping des Données Apprenants XLSX vers la collection DonneesApprenants
 */

import { DONNEES_APPRENANT_XLSX_FIELDS } from "../../domain/donneesApprenants.js";

export const toDonneesApprenantsFromXlsx = (donneesApprenantsXlsx) => ({
  cfd: donneesApprenantsXlsx[DONNEES_APPRENANT_XLSX_FIELDS.CFD],
  annee_scolaire: donneesApprenantsXlsx[DONNEES_APPRENANT_XLSX_FIELDS.AnneeScolaire],
  annee_formation: donneesApprenantsXlsx[DONNEES_APPRENANT_XLSX_FIELDS.AnneeFormation],
  nom_apprenant: donneesApprenantsXlsx[DONNEES_APPRENANT_XLSX_FIELDS.NomApprenant],
  prenom_apprenant: donneesApprenantsXlsx[DONNEES_APPRENANT_XLSX_FIELDS.PrenomApprenant],
  date_de_naissance_apprenant: donneesApprenantsXlsx[DONNEES_APPRENANT_XLSX_FIELDS.DateDeNaissanceApprenant],
  code_rncp: donneesApprenantsXlsx[DONNEES_APPRENANT_XLSX_FIELDS.CodeRNCP],
  telephone_apprenant: donneesApprenantsXlsx[DONNEES_APPRENANT_XLSX_FIELDS.TelephoneApprenant],
  email_apprenant: donneesApprenantsXlsx[DONNEES_APPRENANT_XLSX_FIELDS.EmailApprenant],
  ine_apprenant: donneesApprenantsXlsx[DONNEES_APPRENANT_XLSX_FIELDS.IneApprenant],
  code_commune_insee_apprenant: donneesApprenantsXlsx[DONNEES_APPRENANT_XLSX_FIELDS.CodeCommuneInseeApprenant],
  date_inscription: donneesApprenantsXlsx[DONNEES_APPRENANT_XLSX_FIELDS.DateInscription],
  date_contrat: donneesApprenantsXlsx[DONNEES_APPRENANT_XLSX_FIELDS.DateContrat],
  date_sortie_formation: donneesApprenantsXlsx[DONNEES_APPRENANT_XLSX_FIELDS.DateSortieFormation],
});
