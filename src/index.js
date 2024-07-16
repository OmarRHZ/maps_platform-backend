import express from 'express';
import cors from 'cors';
import landplotsRoutes from './routes/landplots_routes.js';

const app = express();

const ACCEPTED_ORIGINS=[
    'http://localhost:5173',
    'https://omarrhz.github.io',
    'https://omarrhz.github.io/',
    'https://omarrhz.github.io/maps_platform/',
    'https://omarrhz.github.io/maps_platform/#',
    'https://maps-platform-frontend.vercel.app'
]

const corsOptions = {
    origin: function (origin, callback) {
        if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

app.use(cors(corsOptions));

app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api', landplotsRoutes);

app.listen(3322, () => {
    console.log('Server is running on port 3322');
});
