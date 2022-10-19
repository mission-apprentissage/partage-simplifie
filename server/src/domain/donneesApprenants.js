import Joi from "joi";
import { schema as uaiSchema } from "../domain/uai.js";
import { schema as siretSchema } from "../domain/siret.js";

export const DONNEES_APPRENANT_XLSX_FIELDS = {
  NomDuChamp: "Nom du champ",
  CFD: "Code Formation Diplôme",
  CodeRNCP: "Code RNCP",
  AnneeScolaire: "Année scolaire sur laquelle l'apprenant est positionné",
  AnneeFormation: "Année de formation dans le cursus (1,2 ou 3)",
  NomApprenant: "Nom de l'apprenant",
  PrenomApprenant: "Prénom de l'apprenant",
  DateDeNaissanceApprenant: "Date de naissance de l'apprenant",
  TelephoneApprenant: "Téléphone de l'apprenant",
  EmailApprenant: "Email de l'apprenant",
  IneApprenant: "INE de l'apprenant",
  CodeCommuneInseeApprenant: "Code commune INSEE de l'apprenant",
  DateInscription: "Date d'inscription en formation",
  DateFinFormation: "Date de fin de formation prévue",
  DateDebutContrat: "Date de début de contrat en cours",
  DateFinContrat: "Date de fin de contrat prévue du contrat en cours",
  DateRuptureContrat: "Date de rupture de contrat",
  DateSortieFormation: "Sortie de la formation (arrêt du contrat et de cette formation en apprentissage).",
};

export const DONNEES_APPRENANT_XLSX_FILE = {
  NB_LINES_TO_REMOVE: 5,
  HEADERS: [
    DONNEES_APPRENANT_XLSX_FIELDS.NomDuChamp,
    DONNEES_APPRENANT_XLSX_FIELDS.CFD,
    DONNEES_APPRENANT_XLSX_FIELDS.CodeRNCP,
    DONNEES_APPRENANT_XLSX_FIELDS.AnneeScolaire,
    DONNEES_APPRENANT_XLSX_FIELDS.AnneeFormation,
    DONNEES_APPRENANT_XLSX_FIELDS.NomApprenant,
    DONNEES_APPRENANT_XLSX_FIELDS.PrenomApprenant,
    DONNEES_APPRENANT_XLSX_FIELDS.DateDeNaissanceApprenant,
    DONNEES_APPRENANT_XLSX_FIELDS.TelephoneApprenant,
    DONNEES_APPRENANT_XLSX_FIELDS.EmailApprenant,
    DONNEES_APPRENANT_XLSX_FIELDS.IneApprenant,
    DONNEES_APPRENANT_XLSX_FIELDS.CodeCommuneInseeApprenant,
    DONNEES_APPRENANT_XLSX_FIELDS.DateInscription,
    DONNEES_APPRENANT_XLSX_FIELDS.DateFinFormation,
    DONNEES_APPRENANT_XLSX_FIELDS.DateDebutContrat,
    DONNEES_APPRENANT_XLSX_FIELDS.DateFinContrat,
    DONNEES_APPRENANT_XLSX_FIELDS.DateRuptureContrat,
    DONNEES_APPRENANT_XLSX_FIELDS.DateSortieFormation,
  ],
};

export const schema = Joi.object()
  .keys({
    user_email: Joi.string().email().required(),
    user_uai: uaiSchema.required(),
    user_siret: siretSchema.required(),
    user_nom_etablissement: Joi.string().required(),

    cfd: Joi.string().required(),
    annee_scolaire: Joi.string().required(),
    annee_formation: Joi.number().required(),
    nom_apprenant: Joi.string().required(),
    prenom_apprenant: Joi.string().required(),
    date_de_naissance_apprenant: Joi.date().iso().required(),

    code_rncp: Joi.string().allow("", null),
    telephone_apprenant: Joi.string().allow("", null),
    email_apprenant: Joi.string().email().allow("", null),
    ine_apprenant: Joi.string().allow("", null),
    code_commune_insee_apprenant: Joi.string().allow("", null),
    date_inscription: Joi.date().iso().allow(null),
    date_fin_formation: Joi.date().iso().allow(null),
    date_debut_contrat: Joi.date().iso().allow(null),
    date_fin_contrat: Joi.date().iso().allow(null),
    date_rupture_contrat: Joi.date().iso().allow(null),
    date_sortie_formation: Joi.date().iso().allow(null),
  })
  .or("date_inscription", "date_debut_contrat", "date_sortie_formation");

const arraySchema = Joi.array().items(schema);

export const getValidationResult = (donneesApprenant) =>
  schema.required().validate(donneesApprenant, { abortEarly: false });

export const getValidationResultFromList = (donneesApprenantList) =>
  arraySchema.required().validate(donneesApprenantList, { abortEarly: false });

/**
 * Formatte les erreurs JOI en liste par champ en erreur
 * @param {*} error
 * @returns
 */
export const getFormattedErrors = (error) => {
  const errorsWithoutMissingObjects = error.details.filter((item) => item.type !== "object.missing");
  const errorsWithMissingObjects = error.details.filter((item) => item.type === "object.missing");

  // Récupération des champs uniques en erreur
  const uniqueErrorsFields = [...new Set(errorsWithoutMissingObjects.map((item) => item?.context?.key))];
  let errorsByFields = [];

  // Récupération du nombre de lignes uniques en erreur par champ
  for (const key in uniqueErrorsFields) {
    const errorField = uniqueErrorsFields[key];
    const errorsForField = error.details.filter((item) => item?.context?.key === errorField);
    errorsByFields.push({ errorField, errorsForField });
  }

  // Ajout du du nombre de lignes en erreur avec l'une des 3 dates nécessaires manquante
  if (errorsWithMissingObjects.length > 0) {
    errorsByFields.push({
      errorField: "dates_inscription_contrat_sortie_formation",
      errorsForField: errorsWithMissingObjects,
    });
  }

  return errorsByFields;
};
