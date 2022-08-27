import { writeData } from "oleoduc";
import { dbCollection } from "../../model/db/mongodbClient.js";

/**
 * Envoi les logs dans un json
 * @param {*} outputName
 * @returns
 */
export const mongodbStream = (level) => {
  return {
    name: "mongodb",
    type: "raw",
    level: level,
    stream: writeData((data) => dbCollection("logs").insertOne(data)),
  };
};
