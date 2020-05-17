import express from 'express';
import { PORT } from './config/constants';
import { concertRouter } from './routes';

const app = express();
app.use(express.json());
app.use('/concert', concertRouter);

app.listen(PORT, () => {
    console.log(`Listening on Port: http://localhost:${PORT}`);
});