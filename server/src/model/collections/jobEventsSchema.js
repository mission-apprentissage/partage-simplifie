import { date, object, objectId, string } from "./jsonSchema/jsonSchemaTypes.js";

const name = "jobEvents";

const indexes = () => {
  return [
    [{ jobname: 1 }, { name: "jobname" }],
    [{ action: 1 }, { name: "action" }],
  ];
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

export default { name, indexes, schema };
