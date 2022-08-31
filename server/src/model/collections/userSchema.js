import { arrayOf, date, object, objectId, string } from "./jsonSchema/jsonSchemaTypes.js";

export const name = "users";

export const indexes = () => {
  return [[{ email: 1 }, { name: "email", unique: true }]];
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
