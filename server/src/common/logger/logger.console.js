import PrettyStream from "bunyan-prettystream";

/**
 * Envoi les logs dans la console
 * @param {*} outputName
 * @returns
 */
export const consoleStream = (level) => {
  const pretty = new PrettyStream();
  pretty.pipe(process.stdout);
  return {
    name: "console",
    level,
    stream: pretty,
  };
};
