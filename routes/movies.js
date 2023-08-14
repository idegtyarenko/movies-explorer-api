import express from 'express';

import { createMovie, deleteMovie, getMovies } from '../controllers/movies.js';
import allMovieFields from '../validators/movies.js';
import { requestWithIdInParameters } from '../validators/index.js';

const router = express.Router();

router.post('/', allMovieFields, createMovie);
router.get('/', getMovies);
router.delete('/:_id', requestWithIdInParameters, deleteMovie);

export default router;
