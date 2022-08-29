import { logger } from "../../../common/logger/logger.js";

export const runGeneratePasswordUpdateToken = async (users, { username }) => {
  logger.info(`Will create password update token for user ${username}`);

  const token = await users.generatePasswordUpdateToken(username);

  logger.info(`Password update token for user ${username} successfully created -> ${token}`);
  logger.info(`Password update link -> ${users.getUpdatePasswordLink(token)}`);
};
