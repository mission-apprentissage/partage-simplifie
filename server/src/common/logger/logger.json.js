/**
 * Envoi les logs dans un json
 * @param {*} outputName
 * @returns
 */
const jsonStream = (level) => {
  return {
    name: "json",
    level,
    stream: process.stdout,
  };
};

module.exports = { jsonStream };
