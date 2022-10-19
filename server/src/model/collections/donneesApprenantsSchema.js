import { date, number, object, objectId, string } from "./jsonSchema/jsonSchemaTypes.js";

export const name = "donneesApprenants";

export const indexes = () => {
  return [[{ user_email: 1 }, { name: "user_email" }]];
};

export const schema = () => {
  return object(
    {
      _id: objectId(),
      user_email: string(),
      user_uai: string(),
      user_siret: string(),
      user_nom_etablissement: string(),
      cfd: string(),
      code_rncp: string(),
      annee_scolaire: string(),
      annee_formation: number(),
      nom_apprenant: string(),
      prenom_apprenant: string(),
      date_de_naissance_apprenant: date(),
      telephone_apprenant: string(),
      email_apprenant: string(),
      ine_apprenant: string(),
      code_commune_insee_apprenant: string(),
      date_inscription: date(),
      date_fin_formation: date(),
      date_debut_contrat: date(),
      date_fin_contrat: date(),
      date_rupture_contrat: date(),
      date_sortie_formation: date(),
      created_at: date(),
    },
    { required: ["user_email", "user_uai", "user_siret", "created_at"] }
  );
};

export default { name, schema, indexes };
