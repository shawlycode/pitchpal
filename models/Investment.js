import { Model, Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";



const investmentSchema = new Schema({
  investor: { type: Types.ObjectId, ref: 'User', required: true },
  pitch: { type: Types.ObjectId, ref: 'Pitch', required: true },
  amount: { type: Number, required: true }
}, {
  timestamps: true
})
investmentSchema.plugin(toJSON)
export const Investment = model('Investment', investmentSchema);