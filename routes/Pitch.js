import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addPitch, deletePitch, getPitches } from "../controllers/Pitch.js";


//create route
const pitchRouter = Router();
//define routes endpoints
pitchRouter.post('/pitches', isAuthenticated, addPitch);
pitchRouter.get('/pitches', getPitches)
pitchRouter.patch('/pitches/:id', isAuthenticated);
pitchRouter.delete('/pitches/:id', isAuthenticated, deletePitch)


//export router
export default pitchRouter;