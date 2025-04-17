import mongoose, { Schema, Document } from 'mongoose'
import { LocalizedStringSchema } from './util/localized.string.model'

export interface ILineup extends Document {
    name: String,
    description: String
}

const LineupSchema = new Schema({
    title: { type: LocalizedStringSchema },
    days: [
        {
            dateTime: { type: Date },
            stages: [
                {
                    title: { type: String },
                    activities: [
                        {
                            id: { type: Schema.Types.ObjectId, ref: 'Activity' },
                            title: { type: String },
                            subtitle: { type: String },
                            start: { type: Date },
                            duration: { type: Number }
                        }
                    ]
                }
            ]
        }
    ]
})

export const lineupModel = mongoose.model<ILineup>('Lineup', LineupSchema)