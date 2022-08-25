const nock = require("nock"); // eslint-disable-line node/no-unpublished-require
const { startMongodb, stopMongodb, clearMongodb } = require("./mongoUtils");
const { nockExternalApis } = require("./nockApis");

const LOCAL_HOST = "127.0.0.1";
const MONGODB_MEMORY_SERVER_DL_HOST = "fastdl.mongodb.org";

// disable HTTP requests on the network for tests, except to reach local server and mondodb-inmemory-server
nock.disableNetConnect();
nock.enableNetConnect((host) => {
  return host.includes(LOCAL_HOST) || host.includes(MONGODB_MEMORY_SERVER_DL_HOST);
});

// connect to mongodb and create indexes before running tests
exports.mochaGlobalSetup = async () => {
  await startMongodb();
};

// hooks that will be used in every test suite
exports.mochaHooks = {
  beforeEach: () => {
    nockExternalApis();
  },
  afterEach: async () => {
    nock.cleanAll();
    await clearMongodb();
  },
};

// close mongo connection when all tests have been run
exports.mochaGlobalTeardown = async () => {
  await stopMongodb();
};
