const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const movieSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    artists: {
      type: String,
      required: true,
      trim: true,
    },
    genres: {
      type: String,
      required: true,
      trim: true,
    },
    totalVote: {
      type: Number,
      default: 0,
    },
    totalViews: {
      type: Number,
      default: 0,
    },
    usersVote: [
      {
        type: String,
      },
    ],
    watchUrl: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error('Invalid url');
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
movieSchema.plugin(toJSON);
movieSchema.plugin(paginate);

/**
 * Check if title is taken
 * @param {string} title - The movie's title
 * @param {ObjectId} [excludeMovieId] - The id of the movie to be excluded
 * @returns {Promise<boolean>}
 */
movieSchema.statics.isMovieTitle = async function (title, excludeMovieId) {
  const movie = await this.findOne({ title, _id: { $ne: excludeMovieId } });
  return !!movie;
};

/**
 * @typedef Movie
 */
const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
