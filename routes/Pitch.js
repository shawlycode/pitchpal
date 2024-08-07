import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addPitch, deletePitch, getPitches } from "../controllers/Pitch.js";


//create route
const pitchRouter = Router();
//define routes endpoints
pitchRouter.post('/pitch', isAuthenticated, addPitch);
pitchRouter.get('/pitches', getPitches)
pitchRouter.patch('/pitch/:id', isAuthenticated);
pitchRouter.delete('/pitch/:id', isAuthenticated, deletePitch)


//export router
export default pitchRouter;