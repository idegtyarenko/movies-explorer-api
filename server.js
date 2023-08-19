import mongoose from 'mongoose';

import app from './app.js';
import { DATABASE_URL, PORT } from './utils/config.js';

mongoose.connect(DATABASE_URL);
app.listen(PORT, () => {});
