import { Model, Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


const userSchema = new Schema({

  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  role: { enum: ["entrepreneur", "investor"], require: true },
},
  { timestamps: true })