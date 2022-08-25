const logger = require("../../common/logger");

module.exports.runTest = async (userEvents) => {
  logger.info("Test");
  await userEvents.create({ username: "testUser", type: "any", data: { hello: "world" } });
  logger.info("End !");
};
