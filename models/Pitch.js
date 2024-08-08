import { model, Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";



const pitchSchema = new Schema({
  user: { type: Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  founderVideoUrl: { type: String }, // 1 minute video(upload) intro of founder(s)
  recordVideo: { type: String }, // record 1 minute video of founder(s)
  companyName: { type: String, required: true },
  role: { type: String, enum: ['Founder', 'CTO', 'CEO, Developer', 'Sales and Marketing'] },
  description: { type: String, required: true }, // about your company
  techSector: { type: String },
  companyUrl: { type: String },//company website if any
  demoUrl: { type: String }, //upload pitch demo 
  recordDemo: { type: String }, //record pitch on screen using the platform
  slidesUrl: { type: String }, // pitch slides eg. powerPoint
  fundingGoal: { type: Number, required: true },
  fundingAmount: { type: Number, default: 0.00 },
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
  reviewStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'approved' },
  reviewedBy: { type: Types.ObjectId, ref: 'Admin' },
  productUrl: { type: String }, //link to pitch product if already in the market
  productDetails: { type: String }, //what the product does
  ideation: { type: String }, // why the idea/product?
  competitors: { type: String },
  forcastAmount: { type: Number, default: 0.00 }, // how will you make  money/ how much have you made so far?
  companyRegDocs: { type: String } // company legal documents

},

  { timestamps: true });
pitchSchema.plugin(toJSON)
export const PitchModel = model('Pitch', pitchSchema);
