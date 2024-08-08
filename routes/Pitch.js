import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addPitch, deletePitches, getPitches, getSinglePitch } from "../controllers/Pitch.js";


//create route
const pitchRouter = Router();
//define routes endpoints
pitchRouter.post('/pitches', isAuthenticated, addPitch);
pitchRouter.get('/pitches', getPitches)
pitchRouter.patch('/pitches/:id', isAuthenticated);
pitchRouter.delete('/pitches/:id', isAuthenticated, deletePitches)
pitchRouter.get('/pitches/:id', isAuthenticated, getSinglePitch);


//export router
export default pitchRouter;