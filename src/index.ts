import express from 'express';
import { PORT, DB_URL } from './config/constants';
import mongoose from "mongoose";
import { concertRouter } from './routes';

mongoose
.connect(DB_URL, { useNewUrlParser: true, dbName: 'hornsAppDB', useUnifiedTopology: true})
        .then(() => console.log("Connected to MongoDB..."))
        .catch(err => console.error(`Could not connect to MongoDB: ${err}`));

const app = express();
app.use(express.json());
app.use('/concert', concertRouter);

app.listen(PORT, () => {
    console.log(`Listening on Port: http://localhost:${PORT}`);
});