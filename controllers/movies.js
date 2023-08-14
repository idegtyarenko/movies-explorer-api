import { Error as MongooseError } from 'mongoose';

import Movie from '../models/movie.js';
import {
  statusCodes,
  MONGOOSE_CONFLICT_ERROR_CODE,
} from '../utils/constants.js';
import { successMessages } from '../utils/strings.js';
import ValidationError from '../errors/ValidationError.js';
import ConflictingMovieError from '../errors/ConflictingMovieError.js';
import ForbiddenError from '../errors/ForbiddenError.js';
import InvalidIdError from '../errors/InvalidIdError.js';
import NotFoundError from '../errors/NotFoundError.js';

export async function createMovie(req, res, next) {
  try {
    const userId = req.user._id;
    const movieData = { ...req.body, owner: userId };
    const newMovie = await Movie.create(movieData);
    res.status(statusCodes.CREATED);
    res.send(newMovie);
  } catch (err) {
    if (err instanceof MongooseError.ValidationError) {
      next(new ValidationError());
    } else if (err.code === MONGOOSE_CONFLICT_ERROR_CODE) {
      next(new ConflictingMovieError());
    } else {
      next(err);
    }
  }
}

export async function getMovies(req, res, next) {
  try {
    const movies = await Movie.find({});
    res.send(movies);
  } catch (err) {
    next(err);
  }
}

function isCurrentUsersMovie(movie, req) {
  const movieOwnerId = movie.owner._id.toString();
  const currentUserId = req.user._id;
  return movieOwnerId === currentUserId;
}

export async function deleteMovie(req, res, next) {
  try {
    const movie = await Movie.findOne({ _id: req.params._id }).populate('owner');
    if (!movie) {
      next(new NotFoundError());
    }
    if (isCurrentUsersMovie(movie, req)) {
      await Movie.findByIdAndDelete(movie._id);
      res.send(successMessages.MOVIE_DELETED);
    } else {
      throw new ForbiddenError();
    }
  } catch (err) {
    if (err instanceof MongooseError.CastError) {
      next(new InvalidIdError());
    } else if (err instanceof MongooseError.ValidationError) {
      next(new ValidationError());
    } else {
      next(err);
    }
  }
}
