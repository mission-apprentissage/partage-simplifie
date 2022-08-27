import { date, object, objectId, string } from "./jsonSchema/jsonSchemaTypes.js";

export const name = "userEvents";

export const indexes = () => {
  return [
    [{ username: 1 }, { name: "username" }],
    [{ action: 1 }, { name: "action" }],
  ];
};

export const schema = () => {
  return object(
    {
      _id: objectId(),
      username: string(),
      type: string(),
      data: object({}),
      created_at: date(),
    },
    { required: ["username", "created_at"] }
  );
};

export default { name, schema, indexes };
