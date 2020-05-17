import express from 'express';
import { PORT } from './config/constants';

const app = express();
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Listening on Port: http://localhost:${PORT}`);
});