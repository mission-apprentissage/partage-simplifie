import Joi from "joi";
import { schema as uaiSchema } from "../domain/uai.js";
import { schema as siretSchema } from "../domain/siret.js";

export const DONNEES_APPRENANT_XLSX_FIELDS = {
  NomDuChamp: "Nom du champ",
  CFD: "CFD",
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
  DateInscription: "Date d'inscription en formation sans contrat (soit initialement soit après une rupture de contrat)",
  DateContrat: "Date de contrat",
  DateSortieFormation: "Date de sortie de la formation : arrêt du contrat + de cette formation",
};

export const DONNEES_APPRENANT_XLSX_FILE = {
  NB_LINES_TO_REMOVE: 4,
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
    DONNEES_APPRENANT_XLSX_FIELDS.DateContrat,
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
    date_contrat: Joi.date().iso().allow(null),
    date_sortie_formation: Joi.date().iso().allow(null),
  })
  .or("date_inscription", "date_contrat", "date_sortie_formation");

const arraySchema = Joi.array().items(schema);

export const getValidationResult = (donneesApprenant) =>
  schema.required().validate(donneesApprenant, { abortEarly: false });

export const getValidationResultFromList = (donneesApprenantList) =>
  arraySchema.required().validate(donneesApprenantList, { abortEarly: false });

export const getFormattedErrors = (error) => {
  let errorsFormattedList = [];

  // Récupération du nombre de lignes uniques en erreur
  const uniqueErrorsPath = [...new Set(error.details.map((item) => item?.path[0]))];
  const errorsLength = uniqueErrorsPath.length;

  // Construction de la liste des couples "champs-type" pour chaque erreur de chaque ligne
  for (let index = 0; index < errorsLength; index++) {
    const errorsForLine = error.details.filter((item) => item?.path[0] === index);

    let errorsDetails = [];
    for (const key in errorsForLine) {
      errorsDetails.push({ errorType: errorsForLine[key]?.type, errorField: errorsForLine[key]?.context?.key });
    }

    errorsFormattedList.push({ lineNumber: index + 1, errors: errorsDetails });
  }

  return errorsFormattedList;
};
