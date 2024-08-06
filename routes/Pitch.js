import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addPitch, getPitches } from "../controllers/Pitch.js";


//create route
const pitchRouter = Router();
//define routes endpoints
pitchRouter.post('/pitch', isAuthenticated, addPitch);
pitchRouter.get('/pitches', getPitches)
pitchRouter.patch('/pitch/:id', isAuthenticated, updatePitch)


//export router
export default pitchRouter;