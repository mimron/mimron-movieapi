const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    emailAddress: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    userName: Joi.string().trim().alphanum().min(3).max(30).required(),
    accountNumber: Joi.string().trim().alphanum().min(3).max(30).required(),
    identityNumber: Joi.string().trim().alphanum().min(3).max(30).required(),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    userName: Joi.string().alphanum().min(3).max(30),
    accountNumber: Joi.string().trim().alphanum().min(3).max(30),
    identityNumber: Joi.string().trim().alphanum().min(3).max(30),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      emailAddress: Joi.string().email(),
      password: Joi.string().custom(password),
      userName: Joi.string().trim().alphanum().min(3).max(30),
      accountNumber: Joi.string().trim().alphanum().min(3).max(30),
      identityNumber: Joi.string().trim().alphanum().min(3).max(30),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
