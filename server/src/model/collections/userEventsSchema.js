const { date, object, objectId, string } = require("./jsonSchema/jsonSchemaTypes.js");

const name = "userEvents";

const indexes = () => {
  return [
    [{ username: 1 }, { name: "username" }],
    [{ action: 1 }, { name: "action" }],
  ];
};

const schema = () => {
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

module.exports = { name, schema, indexes };
