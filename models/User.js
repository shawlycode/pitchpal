import { model, Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


const userSchema = new Schema({

  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  role: { type: String, enum: ["entrepreneur", "investor", "admin"], default: 'entrepreneur', required: true },
},
  { timestamps: true });
userSchema.plugin(toJSON);
export const UserModel = model('User', userSchema);