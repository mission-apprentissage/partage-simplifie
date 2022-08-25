// eslint-disable-next-line node/no-unpublished-require
const axiosist = require("axiosist");
const createServices = require("../../src/services/services");
const server = require("../../src/http/server");
const { getDatabase } = require("../../src/model/db/mongodbClient");

const startServer = async () => {
  const db = getDatabase();
  const services = await createServices({ db });

  const app = await server(services);
  const httpClient = axiosist(app);

  return {
    httpClient,
    services,
  };
};

const wait = async (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

module.exports = {
  startServer,
  wait,
};
