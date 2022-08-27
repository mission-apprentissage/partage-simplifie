/**
 * Envoi les logs dans un json
 * @param {*} outputName
 * @returns
 */
export const jsonStream = (level) => {
  return {
    name: "json",
    level,
    stream: process.stdout,
  };
};
