import express from 'express'
import { dbconnection } from './config/db.js'




const pitchpal = express()
pitchpal.use(express.json())

//listening to port
const PORT = process.env.PORT || 8090


dbconnection()
  .then(() => {
    pitchpal.listen(PORT, () => {
      console.log(`Server is listening to ${PORT}`)
    })
  })
  .catch((err) => {
    console.log(err);
    process.exit(-1);
  })

  ;