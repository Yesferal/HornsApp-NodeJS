import mongoose, { Schema, Document } from 'mongoose';

export interface IState extends Document {
    name: String,
    description: String
}

const StateShema = new Schema({
    name: {
        type: String,
        require: true,
        minlength: 1,
        maxlength: 25
    },
    descrption: {
        type: String,
        require: true,
        minlength: 1,
        maxlength: 250
    }
})

export const stateModel = mongoose.model<IState>('State', StateShema);