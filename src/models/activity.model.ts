import mongoose, { Schema, Document } from 'mongoose'
import { IEvent } from './event.model'

export interface IActivity extends Document {
    name: String,
    logoImage: String,
    membersImage: String,
    formerIn: Number,
    concerts: IEvent['_id']
}

const ActivitySchema: Schema = new Schema({
    name: { type: String, require: true, minlength: 1, maxlength: 50 },
    about: {
        en: { type: String },
        es: { type: String }
    },
    images: {
        logo: { type: String, require: true },
        members: { type: String, require: true }
    },
    country: {
        en: { type: String },
        es: { type: String }
    },
    formerIn: { type: Number },
    genres: [{ type: String }],
    events: [{ type: Schema.Types.ObjectId, ref: 'Event' }]
})

export const activityModel = mongoose.model<IActivity>('Activity', ActivitySchema)