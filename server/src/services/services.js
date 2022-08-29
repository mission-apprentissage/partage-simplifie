import { connectToMongodb } from "../model/db/mongodbClient.js";
import createUserEventsService from "./userEventsService.js";
import createJobEventsService from "./jobEventsService.js";
import createUsersService from "./usersService.js";

export const createServices = async (options = {}) => {
  const userEvents = options.userEvents || createUserEventsService();
  const jobEvents = options.jobEvents || createJobEventsService();
  const users = options.users || createUsersService();

  return {
    userEvents,
    jobEvents,
    users,
    db: options.db || (await connectToMongodb()).db,
  };
};
