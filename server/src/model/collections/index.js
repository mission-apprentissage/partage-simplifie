const JobEventsSchema = require("./jobEventsSchema");
const UserEventsSchema = require("./userEventsSchema");

const COLLECTIONS_SCHEMAS = [JobEventsSchema, UserEventsSchema];

const COLLECTIONS_NAMES = {
  JobEvents: JobEventsSchema.name,
  UserEvents: UserEventsSchema.name,
  Logs: "logs",
};

const COLLECTIONS_INDEXS = {
  JobEvents: JobEventsSchema.indexes,
  UserEvents: UserEventsSchema.indexes,
};

module.exports = { COLLECTIONS_SCHEMAS, COLLECTIONS_NAMES, COLLECTIONS_INDEXS };
