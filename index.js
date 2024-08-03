import express from 'express'
import { dbconnection } from './config/db.js'
import { userRouter } from './routes/User.js';
import cors from 'cors'
import MongoStore from 'connect-mongo';
import expressOasGenerator from '@mickeymond/express-oas-generator'
import session from 'express-session';
import 'dotenv/config'
import mongoose from 'mongoose';
import pitchRouter from './routes/Pitch.js';


const pitchpal = express();


expressOasGenerator.handleResponses(pitchpal, {
  alwaysServeDocs: true,
  tags: ['auth', 'User'],
  mongooseModels: mongoose.modelNames(),
})
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


pitchpal.use(cors({ credentials: true, origin: '*' }));

//listening to port
const PORT = process.env.PORT || 8090
pitchpal.use('/users', userRouter);
pitchpal.use('/users', pitchRouter);

expressOasGenerator.handleRequests();
pitchpal.use((req, res) => res.redirect('/api-docs/'));
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