import { Model, Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";



const pitchSchema = new Schema({
  user: { type: Types.ObjectId, ref: "User", required: true },
  founderVideoUrl: { type: String }, // 1 minute video(upload) intro of founder(s)
  recordVideo: { type: String }, // record 1 minute video of founder(s)
  companyName: { type: String },
  role: { type: string, enum: ['Founder', 'CTO', 'CEO, Developer', 'Sales and Marketing'] },
  description: { type: String, required: true },
  companyUrl: { type: String },
  demoUrl: { type: String },
  recordDemo: { type: String },
  slidesUrl: { type: String },
  fundingGoal: { type: Number, required: true },
  fundingAmount: { type: Number, default: 0.00 },
  status: { type: String, enum: ['Open', 'Pending Approval', 'Approved', 'In Progress', 'Closed'], default: 'Closed' },
  productUrl: { type: String },
  productDetails: { type: String },
  ideation: { type: String }, // why the idea
  competitors: { type: String },
  forcastAmount: { type: Number, default: 0.00 }, // how will you make  money?
  companyRegDocs: { type: String }

},

  { timestamps: true });
pitchSchema.plugin(toJSON)
export const Pitch = model('Pitch', pitchSchema);
