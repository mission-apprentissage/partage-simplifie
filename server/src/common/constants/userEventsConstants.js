/**
 * Nom des types des UserEvents
 */
export const USER_EVENTS_TYPES = {
  POST: "POST",
  GET: "GET",
};

/**
 * Noms des actions des UserEvents
 */
export const USER_EVENTS_ACTIONS = {
  LOGIN: {
    SUCCESS: "login-success",
    FAIL: "login-failed",
  },
  REGISTER: "register",
  UPDATE_PASSWORD: "update-password",
  USERS: {
    GET_ALL: "get-all",
  },
  UPLOAD: {
    INIT: "upload-init",
    SUCCESS: "upload-success",
    ERROR: "upload-error",
  },
};
