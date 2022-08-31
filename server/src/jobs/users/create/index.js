import { logger } from "../../../common/logger/logger.js";
import { ROLES } from "../../../common/constants/roles.js";

export const runCreateUser = async (users, { email, role }) => {
  logger.info(`Will create user ${email} and role ${role} `);

  if (!Object.values(ROLES).some((item) => item === role)) {
    throw new Error(`Role ${role} doesn't exists !`);
  }

  await users.createUser({ email, role });
  logger.info(`User ${email} successfully created with role ${role}`);
};
