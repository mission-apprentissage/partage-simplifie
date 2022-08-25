const { writeData } = require("oleoduc");
const { dbCollection } = require("../../model/db/mongodbClient");

/**
 * Envoi les logs dans un json
 * @param {*} outputName
 * @returns
 */
const mongodbStream = (level) => {
  return {
    name: "mongodb",
    type: "raw",
    level: level,
    stream: writeData((data) => dbCollection("logs").insertOne(data)),
  };
};

module.exports = { mongodbStream };
