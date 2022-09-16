import Joi from "joi";
const PASSWORD_MIN_LENGTH = 16;

export const schema = Joi.string().min(PASSWORD_MIN_LENGTH);
export const validatePassword = (password) => !schema.required().validate(password).error;
