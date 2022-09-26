const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createMovie = {
  body: Joi.object().keys({
    title: Joi.string().alphanum().min(3).max(30),
    description: Joi.string().trim().min(3).max(300).required(),
    duration: Joi.number().integer(),
    artists: Joi.string().trim().min(3).max(100).required(),
    genres: Joi.string().trim().min(3).max(30).required(),
    watchUrl: Joi.string().trim().required(),
  }),
};

const getMovies = {
  query: Joi.object().keys({
    title: Joi.string().alphanum().min(3).max(30),
    description: Joi.string().trim().min(3).max(300),
    duration: Joi.number().integer(),
    artists: Joi.string().trim().min(3).max(30),
    genres: Joi.string().trim().min(3).max(30),
    watchUrl: Joi.string().trim().min(3).max(30),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getMovie = {
  params: Joi.object().keys({
    movieId: Joi.string().custom(objectId),
  }),
};

const updateMovie = {
  params: Joi.object().keys({
    movieId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().alphanum().min(3).max(30),
      description: Joi.string().trim().min(3).max(300).required(),
      duration: Joi.number().integer(),
      artists: Joi.string().trim().min(3).max(100).required(),
      genres: Joi.string().trim().min(3).max(30).required(),
      watchUrl: Joi.string().trim().required(),
    })
    .min(1),
};

const deleteMovie = {
  params: Joi.object().keys({
    movieId: Joi.string().custom(objectId),
  }),
};

const voteMovie = {
  params: Joi.object().keys({
    movieId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createMovie,
  getMovies,
  getMovie,
  updateMovie,
  deleteMovie,
  voteMovie,
};
