const Joi = require('joi');

export const signupValidation = function (data) {
  const schema = Joi.object({
    fullname: Joi.string().min(3).required(),
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  });
  return schema.validate(data);
};

export const signinValidation = function (data) {
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required()
  });
  return schema.validate(data);
};
