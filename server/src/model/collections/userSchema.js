import { arrayOf, date, object, objectId, string } from "./jsonSchema/jsonSchemaTypes.js";

export const name = "users";

export const indexes = () => {
  return [
    [{ username: 1 }, { name: "username" }],
    [{ email: 1 }, { name: "email" }],
  ];
};

export const schema = () => {
  return object(
    {
      _id: objectId(),
      username: string(),
      email: string(),
      password: string(),
      password_update_token: string(),
      password_update_token_expiry: date(),
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
    { required: ["username", "email", "role", "created_at"] },
    { uniqueItems: ["username", "email"] }
  );
};

export default { name, schema, indexes };
