import { logger } from "../../../common/logger/logger.js";

export const runGeneratePasswordUpdateToken = async (users, { email }) => {
  logger.info(`Will create password update token for user ${email}`);

  const token = await users.generatePasswordUpdateToken(email);

  logger.info(`Password update token for user ${email} successfully created -> ${token}`);
  logger.info(`Password update link -> ${users.getUpdatePasswordLink(token)}`);
};
