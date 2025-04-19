import mongoose, { Schema, Document } from 'mongoose'
import { ViewRenderScheme } from './render/view.render.model'

export interface IEvent extends Document {
    name: String,
    description: String
}

const EventSchema: Schema = new Schema({
    name: { type: String, require: true },
    about: {
        en: { type: String },
        es: { type: String }
    },
    dateTime: { type: Date },
    totalDays: { type: Number },
    headliner: {
        name: { type: String },
        url: { type: String, require: true },
    },
    ticketing: {
        name: { type: String },
        url: { type: String }
    },
    links: [{ type: ViewRenderScheme }],
    tags: [{ type: String }],
    venue: { type: Schema.Types.ObjectId, ref: 'Venue' },
    state: { type: Schema.Types.ObjectId, ref: 'State', require: true },
    activities: [{ type: Schema.Types.ObjectId, ref: 'Activity', require: true }],
    lineup: { type: Schema.Types.ObjectId, ref: 'Lineup' },
})

export const eventModel = mongoose.model<IEvent>('Event', EventSchema)
