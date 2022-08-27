import axiosist from "axiosist";

import { createServices } from "../../src/services/services.js";
import server from "../../src/http/server.js";
import { getDatabase } from "../../src/model/db/mongodbClient.js";

export const startServer = async () => {
  const db = getDatabase();
  const services = await createServices({ db });

  const app = await server(services);
  const httpClient = axiosist(app);

  return {
    httpClient,
    services,
  };
};

export const wait = async (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};
