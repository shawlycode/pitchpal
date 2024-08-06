
import { PitchModel } from "../models/Pitch.js";
import { UserModel } from "../models/User.js";
import { addPitchValidator } from "../validators/Pitch.js";




//create a pitch
export const addPitch = async (req, res, next) => {
  try {
    //validate user request
    const { value, error } = addPitchValidator.validate(req.body);
    if (error) {
      res.status(422).json(error);
    }
    //create pitch
    const pitch = await PitchModel.create({
      ...value,
      user: req.session.user.id
    })
    //return response
    res.status(201).json({ message: 'Pitch created successfully', pitch });
  } catch (error) {
    next(error)
  }
}

//get all pitches
export const getPitches = async (req, res, next) => {
  try {
    //find pitches
    const pitches = await PitchModel.find()
      .populate({ path: 'user', select: { name: true, role: true, techSector: true } });
    //return response
    res.status(200).json(pitches)
  } catch (error) {
    next(error)
  }
}

// update a pitch
