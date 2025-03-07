import express from 'express'
import mongoose from "mongoose"
import { concertRouter, adminConcertRouter, bandRouter, adminBandRouter, venueRouter, adminVenueRouter, stateRouter, reviewRouter, adminReviewRouter, adminAppRenderRouter } from './routers'
import { appRenderController } from './controllers'
import { Middleware } from './middleware/middleware'
import * as socketio from 'socket.io'
import * as http from 'http'
import * as path from "path"
import cors from 'cors'

const PORT = process.env.PORT || ''
const DB_URL = process.env.DB_URL || ''
const SECRET = process.env.SECRET || ''
const ADMIN_SECRET = process.env.ADMIN_SECRET || ''

var middleware = new Middleware(SECRET, ADMIN_SECRET)

mongoose
    .connect(DB_URL, { useNewUrlParser: true, dbName: 'hornsAppDB', useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB..."))
    .catch(error => console.error(`Could not connect to MongoDB: ${error}`))

const app = express()
app.use(express.json())
app.use(cors())
app.use('/concert', middleware.verifyAuthorization, concertRouter)
app.use('/band', middleware.verifyAuthorization, bandRouter)
app.use('/venue', middleware.verifyAuthorization, venueRouter)
app.use('/review', middleware.verifyAuthorization, reviewRouter)

app.use('/admin_concert', middleware.verifyAdminAuthorization, adminConcertRouter)
app.use('/admin_band', middleware.verifyAdminAuthorization, adminBandRouter)
app.use('/admin_venue', middleware.verifyAdminAuthorization, adminVenueRouter)
app.use('/admin_state', middleware.verifyAdminAuthorization, stateRouter)
app.use('/admin_review', middleware.verifyAdminAuthorization, adminReviewRouter)
app.use('/admin_app_render', middleware.verifyAdminAuthorization, adminAppRenderRouter)

// Only to keep our free Heroku App alive
app.get('/heroku', (req, res) => { return res.send('Hello, I am alive') })

app.get("/", (req: any, res: any) => {
    res.sendFile(path.resolve("./src/index.html"))
})

// Socket
const server: http.Server = http.createServer(app)
const io: socketio.Server = new socketio.Server()
io.attach(server)

io.on('connection', async (socket: socketio.Socket) => {

    console.log(`Connection : SocketId = ${socket.id}`)

    const versionCode = Number(socket.handshake.query.versionCode?.toString())
    const platform = socket.handshake.query.platform?.toString()
    if (versionCode && platform) {
        socket.join(getSocketRoom(versionCode, platform))
        const appRender = await appRenderController.findBy(versionCode, platform)
        if (appRender) {
            socket.emit('updateAppRender', JSON.stringify(appRender))
        }
    }

    socket.on("message", function (message: any) {
        console.log("Message: " + message)
        console.log("Queries: " + JSON.stringify(socket.handshake.query))
    })
})

app.use('/updateAppRender', middleware.verifyAuthorization, async (req, res) => {
    const appVersion = Number(req.query.appVersion?.toString())
    const platform = req.query.platform?.toString()

    if (appVersion && platform) {
        const appRender = await appRenderController.findBy(appVersion, platform)
        if (appRender) {
            const room = getSocketRoom(appVersion, platform)
            io.to(room).emit('updateAppRender', JSON.stringify(appRender))
            console.log(`Send updateAppRender to Room ${getSocketRoom(appVersion, platform)}`)

            return res.status(200).json(appRender)
        }
    }

    return res.status(400).json({ error: "No json AppRender available" })
})

function getSocketRoom(versionCode: number, platform: string): string {
    return versionCode + "+" + platform
}

server.listen(PORT, () => {
    console.log(`Http Server listening on Port: http://localhost:${PORT}`)
})
