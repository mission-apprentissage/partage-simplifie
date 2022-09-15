import { date, object, objectId, string } from "./jsonSchema/jsonSchemaTypes.js";

export const name = "userEvents";

export const indexes = () => {
  return [[{ user_email: 1 }, { name: "user_email" }]];
};

export const schema = () => {
  return object(
    {
      _id: objectId(),
      user_email: string(),
      type: string(),
      data: object({}),
      created_at: date(),
    },
    { required: ["user_email", "created_at"] }
  );
};

export default { name, schema, indexes };
