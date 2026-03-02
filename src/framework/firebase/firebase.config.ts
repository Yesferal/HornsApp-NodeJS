// firebase-admin already includes its own TypeScript types.
import admin from "firebase-admin"
import { readFileSync } from "fs"

const FIREBASE_KEY_PATH = process.env.FIREBASE_KEY_PATH || "keys/muvin/serviceAccount.json"
const serviceAccount = JSON.parse(
  readFileSync(FIREBASE_KEY_PATH, "utf-8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
})

export async function sendPushToTopic(topic: string, data: Record<string, string>) {
  return admin.messaging().send({
    topic,
    data
  })
}

export default admin
