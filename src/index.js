import express from 'express';

import landplotsRoutes from './routes/landplots.routes.js';

const app = express();

app.use(express.json());

app.use('/api', landplotsRoutes);

app.listen(3322)
