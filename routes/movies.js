import express from 'express';

import { createMovie, getMovies } from '../controllers/movies.js';
import allMovieFields from '../validators/movies.js';

const router = express.Router();

router.post('/', allMovieFields, createMovie);
router.get('/', getMovies);

export default router;
