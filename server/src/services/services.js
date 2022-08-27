import { connectToMongodb } from "../model/db/mongodbClient.js";
import createUserEventsService from "./userEventsService.js";
import createJobEventsService from "./jobEventsService.js";

export const createServices = async (options = {}) => {
  const userEvents = options.userEvents || createUserEventsService();
  const jobEvents = options.jobEvents || createJobEventsService();

  return {
    userEvents,
    jobEvents,
    db: options.db || (await connectToMongodb()).db,
  };
};
