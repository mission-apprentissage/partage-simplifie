import { logger } from "../../../common/logger/logger.js";
import { ROLES } from "../../../common/constants/roles.js";

export const runCreateUser = async (users, { username, email, role }) => {
  logger.info(`Will create user ${username} with email ${email} and role ${role} `);

  if (!Object.values(ROLES).some((item) => item === role)) {
    throw new Error(`Role ${role} doesn't exists !`);
  }

  await users.createUser({ username, email, role });
  logger.info(`User ${username} successfully created with role ${role}`);
};
