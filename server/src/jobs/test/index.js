import { logger } from "../../common/logger/logger.js";

export const runTest = async (userEvents, organismes) => {
  logger.info("Test");
  await userEvents.createUserEvent({ user_email: "test@test.fr", type: "any", data: { hello: "world" } });
  const test = await organismes.getOrganismesFromReferentiel("0921500F");
  logger.info(test);
  logger.info("End !");
};
