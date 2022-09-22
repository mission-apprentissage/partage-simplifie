import { date, object, objectId, string } from "./jsonSchema/jsonSchemaTypes.js";

export const name = "signalerAnomalie";

export const indexes = () => {
  return [[{ email: 1 }, { name: "email" }]];
};

export const schema = () => {
  return object(
    {
      _id: objectId(),
      email: string(),
      message: string(),
      created_at: date(),
    },
    { required: ["email", "message", "created_at"] }
  );
};

export default { name, schema, indexes };
