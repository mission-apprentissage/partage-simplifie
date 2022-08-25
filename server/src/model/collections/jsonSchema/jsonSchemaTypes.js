const number = (custom = {}) => {
  return { bsonType: "number", ...custom };
};

const integer = (custom = {}) => {
  return { bsonType: "int", ...custom };
};

const objectId = (custom = {}) => {
  return { bsonType: "objectId", ...custom };
};

const string = (custom = {}) => {
  return { bsonType: "string", ...custom };
};

const boolean = (custom = {}) => {
  return { bsonType: "bool", ...custom };
};

const date = (custom = {}) => {
  return { bsonType: "date", ...custom };
};

const arrayOf = (items, custom = {}) => {
  return {
    bsonType: "array",
    ...custom,
    items,
  };
};

const array = (custom = {}) => {
  return {
    bsonType: "array",
    ...custom,
  };
};

const object = (properties, custom = {}) => {
  return {
    bsonType: "object",
    additionalProperties: false,
    ...custom,
    properties,
  };
};

module.exports = { number, integer, objectId, string, boolean, date, array, arrayOf, object };
