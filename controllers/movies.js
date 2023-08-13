import { Error as MongooseError } from 'mongoose';

import Movie from '../models/movie.js';
import {
  statusCodes,
  MONGOOSE_CONFLICT_ERROR_CODE,
} from '../utils/constants.js';
import ValidationError from '../errors/ValidationError.js';
import ConflictingMovieError from '../errors/ConflictingMovieError.js';

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

export function getMovies() {
  throw new Error('Not implemented');
}

export function deleteMovie() {
  throw new Error('Not implemented');
}
