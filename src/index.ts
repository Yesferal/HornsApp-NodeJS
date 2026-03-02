import express from 'express'
import mongoose from "mongoose"
import { concertRouter, eventRouter, adminEventRouter, activityRouter, adminActivityRouter, venueRouter, adminVenueRouter, appRenderRouter, adminAppRenderRouter, adminScreenRenderRouter, screenRenderRouter, lineupRouter, adminStateRouter, adminCategoryRouter, adminCardRenderRouter } from './routers'
import { appRenderController, screenGeneratorController } from './controllers'
import { Middleware } from './middleware/middleware'
import * as socketio from 'socket.io'
import * as http from 'http'
import * as path from "path"
import cors from 'cors'

const PORT = process.env.PORT || ''
const DB_URL = process.env.DB_URL || ''
const HORNS_APP_ANDROID_SECRET = process.env.HORNS_APP_ANDROID_SECRET || ''
const MUVIN_ANDROID_SECRET = process.env.MUVIN_ANDROID_SECRET || ''
const ADMIN_SECRET = process.env.ADMIN_SECRET || ''

var middleware = new Middleware([HORNS_APP_ANDROID_SECRET, MUVIN_ANDROID_SECRET], ADMIN_SECRET)

mongoose
    .connect(DB_URL, { dbName: 'hornsAppDB' })
    .then(() => console.log("Connected to MongoDB..."))
    .catch(error => console.error(`Could not connect to MongoDB: ${error}`))

const app = express()
app.use(express.json())
app.use(cors())
app.use('/concert', middleware.verifyAuthorization, concertRouter)
app.use('/event', middleware.verifyAuthorization, eventRouter)
app.use('/activity', middleware.verifyAuthorization, activityRouter)
app.use('/venue', middleware.verifyAuthorization, venueRouter)
app.use('/screen', middleware.verifyAuthorization, screenRenderRouter)
app.use('/lineup', middleware.verifyAuthorization, lineupRouter)
app.use('/app_render', middleware.verifyAuthorization, appRenderRouter)

app.use('/admin_event', middleware.verifyAdminAuthorization, adminEventRouter)
app.use('/admin_activity', middleware.verifyAdminAuthorization, adminActivityRouter)
app.use('/admin_venue', middleware.verifyAdminAuthorization, adminVenueRouter)
app.use('/admin_state', middleware.verifyAdminAuthorization, adminStateRouter)
app.use('/admin_category', middleware.verifyAdminAuthorization, adminCategoryRouter)
app.use('/admin_screen', middleware.verifyAdminAuthorization, adminScreenRenderRouter)
app.use('/admin_app_render', middleware.verifyAdminAuthorization, adminAppRenderRouter)
app.use('/admin_card', middleware.verifyAdminAuthorization, adminCardRenderRouter)

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

    const appVersion = Number(socket.handshake.query.appVersion?.toString())
    const platform = socket.handshake.query.platform?.toString()
    const appId = socket.handshake.query.appId?.toString()
    if (appVersion && platform && appId) {
        socket.join(getSocketRoom(appVersion, platform, appId))
        const appRender = await appRenderController.findBy(appVersion, platform, appId)
        if (appRender) {
            socket.emit('updateAppRender', JSON.stringify(appRender))
        }
    }

    socket.on("message", function (message: any) {
        console.log("Message: " + message)
        console.log("Queries: " + JSON.stringify(socket.handshake.query))
    })
})

import { sendPushToTopic } from './framework/firebase/firebase.config'

app.use('/sendPushToAppRenderUpdate', middleware.verifyAdminAuthorization, async (req, res) => {
    const appVersion = Number(req.query.appVersion?.toString())
    const topic = req.query.topic?.toString()
    const appId = req.query.appId?.toString()
    const maxRefreshDelay = Number(req.query.maxRefreshDelay?.toString())

    if (appVersion && topic && appId) {
        const data = {
            type: "APP_RENDER_UPDATE",
            appVersion: String(appVersion),
            appId: appId,
            maxRefreshDelay: String(maxRefreshDelay)
        }
        await sendPushToTopic(topic, data)
        console.log(`Send Notification to UpdateAppRender`)

        return res.status(200).json(data)
    }

    return res.status(400).json({ error: "No json AppRender available" })
})

app.use('/updateAppRender', middleware.verifyAuthorization, async (req, res) => {
    const appVersion = Number(req.query.appVersion?.toString())
    const platform = req.query.platform?.toString()
    const appId = req.query.appId?.toString()

    if (appVersion && platform && appId) {
        const appRender = await appRenderController.findBy(appVersion, platform, appId)
        if (appRender) {
            const room = getSocketRoom(appVersion, platform, appId)
            io.to(room).emit('updateAppRender', JSON.stringify(appRender))
            const number = io.sockets.adapter.rooms.get(room)?.size
            console.log(`Send UpdateAppRender to Room: ${getSocketRoom(appVersion, platform, appId)}. Clients: [${number}]`)

            return res.status(200).json(appRender)
        }
    }

    return res.status(400).json({ error: "No json AppRender available" })
})

function getSocketRoom(versionCode: number, platform: string, appId: string): string {
    return "Platform: " + platform + " -> App: " + appId + " - VersionCode: " + versionCode
}

app.use('/autoGenerateDocument', middleware.verifyAdminAuthorization, async (req, res) => {
    const screenTitleEn = req.query.screenTitleEn?.toString()
    const screenTitleEs = req.query.screenTitleEs?.toString()
    const docVersion = Number(req.query.docVersion?.toString())
    const appId = req.query.appId?.toString()

    if (screenTitleEn && screenTitleEs && docVersion && appId) {
        const agdScreen = await screenGeneratorController.autoGenerateHomeScreen(screenTitleEn, screenTitleEs, appId, docVersion)
        return res.status(200).json(agdScreen)
    }

    return res.status(400).json({ error: "No json AppRender available" })
})

server.listen(PORT, () => {
    console.log(`Http Server listening on Port: http://localhost:${PORT}`)
})
