import mongoose from "mongoose";
import 'dotenv/config'


const mongo_uri = process.env.MONGO_URL

export const dbconnection = async (req, res) => {
  try {
    await mongoose.connect(mongo_uri)
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.log(error)
  }
}