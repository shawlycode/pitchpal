import express from 'express'
import { dbconnection } from './config/db.js'
import { userRouter } from './routes/User.js';





const pitchpal = express();

//use middlewares
pitchpal.use(express.json());

pitchpal.use('/user', userRouter)

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