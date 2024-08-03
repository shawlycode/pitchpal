
import { PitchModel } from "../models/Pitch.js";
import { pitchValidator } from "../validators/user.js";


//create a pitch
export const addPitch = async (req, res, next) => {
  try {
    //validate user request
    const { value, error } = pitchValidator.validate(req.body);
    if (error) {
      res.status(422).json(error);
    }
    //create pitch
    const pitch = await PitchModel.create({
      ...value,
      createdBy: req.session.user.id
    })
    //return response
    res.status(200).json(pitch)
  } catch (error) {
    next(error)
  }
}



//get all pitches
export const getPitches = async (req, res, next) => {
  try {
    //find pitches
    const pitches = await PitchModel.find()
      .populate('User');
    //return response
    res.status(200).json(pitches)


  } catch (error) {
    next(error)
  }
}