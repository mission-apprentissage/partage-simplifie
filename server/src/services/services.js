const { connectToMongo } = require("../model/db/mongodbClient");
const createUserEventsService = require("./userEventsService");
const createJobEventsService = require("./jobEventsService");

module.exports = async (options = {}) => {
  const userEvents = options.userEvents || createUserEventsService();
  const jobEvents = options.jobEvents || createJobEventsService();

  return {
    userEvents,
    jobEvents,
    db: options.db || (await connectToMongo()).db,
  };
};
