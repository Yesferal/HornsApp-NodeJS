import express from 'express';
import { DEV_PORT, DEV_DB_URL } from './config/constants';
import mongoose from "mongoose";
import { concertRouter, bandRouter } from './routers';

const PORT = process.env.PORT || DEV_PORT
const DB_URL = process.env.DB_URL || DEV_DB_URL

mongoose
.connect(DB_URL, { useNewUrlParser: true, dbName: 'hornsAppDB', useUnifiedTopology: true})
        .then(() => console.log("Connected to MongoDB..."))
        .catch(err => console.error(`Could not connect to MongoDB: ${err}`));

const app = express();
app.use(express.json());
app.use('/concert', concertRouter);
app.use('/band', bandRouter);

app.listen(PORT, () => {
    console.log(`Listening on Port: http://localhost:${PORT}`);
});