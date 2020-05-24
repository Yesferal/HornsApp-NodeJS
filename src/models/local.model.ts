import mongoose, { Schema, Document } from 'mongoose';

export interface ILocal extends Document {
    name: String,
    description: String
}

const LocalSchema = new Schema({
    name: { type: String, require: true, minlength: 1, maxlength: 25 },
    descrption: { type: String, require: true, minlength: 1, maxlength: 350 },
    latitude: { type: Number },
    longitude: { type: Number },
    imageUrl: { type: String }
})

export const localModel = mongoose.model<ILocal>('Local', LocalSchema);