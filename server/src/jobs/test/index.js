import { logger } from "../../common/logger/logger.js";

export const runTest = async (userEvents) => {
  logger.info("Test");
  await userEvents.createUserEvent({ username: "testUser", type: "any", data: { hello: "world" } });
  logger.info("End !");
};
