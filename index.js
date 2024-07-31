import express from 'express'
import { dbconnection } from './config/db.js'
import { userRouter } from './routes/User.js';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import 'dotenv/config'


const pitchpal = express();

//use middlewares
pitchpal.use(express.json());
pitchpal.use(session({
  secret: process.env.SESSION_SECRETE_KEY,
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL
  })
}))



//listening to port
const PORT = process.env.PORT || 8090
pitchpal.use('/user', userRouter)

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