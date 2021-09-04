import express from 'express';
import mongoose from "mongoose";
import { concertRouter, bandRouter, venueRouter, stateRouter } from './routers'
import { drawerController } from './controllers'
import { Middleware }  from './middleware/middleware'
import * as socketio from 'socket.io';
import * as http from 'http';
import * as path from "path"

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

app.get("/", (req: any, res: any) => {
    res.sendFile(path.resolve("./src/index.html"))
});

// Socket
const server: http.Server = http.createServer(app)
const io: socketio.Server = new socketio.Server()
io.attach(server)

io.on('connection', async (socket: socketio.Socket) => {
    
    console.log(`Connection : SocketId = ${socket.id}`)

    socket.on("message", function (message: any) {
        console.log(message)
    })

    const drawer = await drawerController.findLast()

    socket.emit('updateDrawer', JSON.stringify(drawer))
})

app.use('/updateDrawer', middleware.verifyAuthorization, async (req, res) => {
    const drawer = await drawerController.findLast()
    io.emit('updateDrawer', JSON.stringify(drawer))

    return res.status(200).json(drawer)
})

server.listen(PORT, () => {
    console.log(`Http Server listening on Port: http://localhost:${PORT}`)
});
