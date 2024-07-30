import { Model, Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";




const profileSchema = new Schema({
  profilePicture: { type: String },
  name: { type: Types.ObjectId, ref: "User" },
  email: { type: Types.ObjectId, ref: "User" },
  phoneNumber: { type: String, require: true, unique: true },
  age: { type: String },
  gender: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  linkedInUrl: { type: String, required: true, unique: true },
  education: [{ type: String, required: true }],
  workHistory: [{ type: String, required: true }],
  socialMedia: [{ type: String, unique: true }],
  accomplishments: [{ type: String }]
}, {
  timestamps: true
});
profileSchema.plugin(toJSON)
export const Profile = model('Profile', profileSchema);