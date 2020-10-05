import express from 'express';
import mongoose from "mongoose";
import { concertRouter, bandRouter, venueRouter, stateRouter } from './routers';
import { Middleware }  from './middleware/middleware'

const PORT = process.env.PORT || ''
const DB_URL = process.env.DB_URL || ''
const SECRET = process.env.SECRET || ''

var middleware = new Middleware(SECRET)

mongoose
.connect(DB_URL, { useNewUrlParser: true, dbName: 'hornsAppDB', useUnifiedTopology: true})
        .then(() => console.log("Connected to MongoDB..."))
        .catch(error => console.error(`Could not connect to MongoDB: ${error}`));

const app = express();
app.use(express.json());
app.use('/concert', middleware.verifyAuthorization, concertRouter);
app.use('/band', middleware.verifyAuthorization, bandRouter);
app.use('/venue', middleware.verifyAuthorization, venueRouter);
app.use('/state', middleware.verifyAuthorization, stateRouter);

// Only to keep our free Heroku App alive
app.get('/heroku', (req, res) => { return res.send('Hello, I am alive'); });

app.listen(PORT, () => {
    console.log(`Listening on Port: http://localhost:${PORT}`);
});