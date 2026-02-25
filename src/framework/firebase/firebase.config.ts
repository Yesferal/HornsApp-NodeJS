// firebase-admin already includes its own TypeScript types.
import admin from "firebase-admin"
import serviceAccount from "../../../keys/muvin/serviceAccount.json"

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
