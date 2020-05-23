import express from 'express';
import { DEV_PORT, DEV_DB_URL, DEV_SECRET } from './config/constants';
import mongoose from "mongoose";
import { concertRouter, bandRouter } from './routers';
import { Middleware }  from './middleware/middleware'

const PORT = process.env.PORT || DEV_PORT
const DB_URL = process.env.DB_URL || DEV_DB_URL
const SECRET = process.env.SECRET || DEV_SECRET

var middleware = new Middleware(SECRET)

mongoose
.connect(DB_URL, { useNewUrlParser: true, dbName: 'hornsAppDB', useUnifiedTopology: true})
        .then(() => console.log("Connected to MongoDB..."))
        .catch(error => console.error(`Could not connect to MongoDB: ${error}`));

const app = express();
app.use(express.json());
app.use('/concert', middleware.verifyAuthorization, concertRouter);
app.use('/band', middleware.verifyAuthorization, bandRouter);

app.listen(PORT, () => {
    console.log(`Listening on Port: http://localhost:${PORT}`);
});