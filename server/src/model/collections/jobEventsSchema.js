const { date, object, objectId, string } = require("./jsonSchema/jsonSchemaTypes.js");

const name = "jobEvents";

const indexes = () => {
  return [[{ jobname: 1 }, { name: "jobname" }]];
};

const schema = () => {
  return object(
    {
      _id: objectId(),
      jobname: string(),
      action: string(),
      data: object({}),
      created_at: date(),
    },
    { required: ["jobname", "action", "created_at"] }
  );
};

module.exports = { name, schema, indexes };
