import express from 'express';

import { createMovie } from '../controllers/movies.js';
import allMovieFields from './movies.validator.js';

const router = express.Router();

router.post('/', allMovieFields, createMovie);

export default router;
