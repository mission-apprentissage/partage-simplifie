import { arrayOf, date, object, objectId, string } from "./jsonSchema/jsonSchemaTypes.js";

export const name = "users";

export const indexes = () => {
  return [
    [{ email: 1 }, { name: "email", unique: true }],

    // Ajout d'un index unique sur le couple UAI-SIRET uniques lorsque l'uai et le siret sont non nulls (ie => string)
    // cf. https://stackoverflow.com/questions/64066830/creating-a-partial-index-when-field-is-not-null
    [
      { uai: 1, siret: 1 },
      {
        name: "uai_siret_uniques",
        unique: true,
        partialFilterExpression: { uai: { $type: "string" }, siret: { $type: "string" } },
      },
    ],
  ];
};

export const schema = () => {
  return object(
    {
      _id: objectId(),
      email: string(),
      password: string(),
      password_update_token: string(),
      password_update_token_expiry: date(),
      password_updated_token_at: date(),
      password_updated_at: date(),
      role: string(),
      uai: string(),
      siret: string(),
      nom: string(),
      prenom: string(),
      fonction: string(),
      telephone: string(),
      outils_gestion: arrayOf(string()),
      nom_etablissement: string(),

      updated_at: date(),
      created_at: date(),
    },
    { required: ["email", "role", "created_at"] },
    { uniqueItems: ["email"] }
  );
};

export default { name, schema, indexes };
