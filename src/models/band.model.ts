import mongoose, { Schema, Document } from 'mongoose';
import { IConcert } from './concert.model';

export interface IBand extends Document {
    name: String,
    description: String,
    logoImage: String,
    membersImage: String,
    formerIn: Number,
    concerts: IConcert['_id']
}
  
const BandSchema: Schema = new Schema({
    name: { type: String, require: true, minlength: 1, maxlength: 50 },
    description: { type: String, minlength: 1, maxlength: 350 },
    logoImage: { type: String, require: true },
    membersImage: { type: String, require: true },
    formerIn: { type: Number, require: true },
    genre: { type: String, require: true },
    country: { type: String, requiere: true },
    concerts: [{ type: Schema.Types.ObjectId, ref: 'Concert', require: true}]
});
  
export const bandModel = mongoose.model<IBand>('Band', BandSchema);