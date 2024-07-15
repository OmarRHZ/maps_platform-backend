import express from 'express';

import landplotsRoutes from './routes/landplots_routes.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api', landplotsRoutes);

app.listen(3322)
