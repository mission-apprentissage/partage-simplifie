import JobEventsSchema from "./jobEventsSchema.js";
import UserEventsSchema from "./userEventsSchema.js";
import UsersSchema from "./userSchema.js";

export const COLLECTIONS_SCHEMAS = [JobEventsSchema, UserEventsSchema];

export const COLLECTIONS_NAMES = {
  JobEvents: JobEventsSchema.name,
  UserEvents: UserEventsSchema.name,
  Users: UsersSchema.name,
  Logs: "logs",
};

export const COLLECTIONS_INDEXS = {
  JobEvents: JobEventsSchema.indexes,
  UserEvents: UserEventsSchema.indexes,
  Users: UsersSchema.indexes,
};
