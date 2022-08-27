export const number = (custom = {}) => {
  return { bsonType: "number", ...custom };
};

export const integer = (custom = {}) => {
  return { bsonType: "int", ...custom };
};

export const objectId = (custom = {}) => {
  return { bsonType: "objectId", ...custom };
};

export const string = (custom = {}) => {
  return { bsonType: "string", ...custom };
};

export const boolean = (custom = {}) => {
  return { bsonType: "bool", ...custom };
};

export const date = (custom = {}) => {
  return { bsonType: "date", ...custom };
};

export const arrayOf = (items, custom = {}) => {
  return {
    bsonType: "array",
    ...custom,
    items,
  };
};

export const array = (custom = {}) => {
  return {
    bsonType: "array",
    ...custom,
  };
};

export const object = (properties, custom = {}) => {
  return {
    bsonType: "object",
    additionalProperties: false,
    ...custom,
    properties,
  };
};
