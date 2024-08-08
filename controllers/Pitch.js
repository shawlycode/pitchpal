
import { PitchModel } from "../models/Pitch.js";
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
// getting a single pitch by id
export const getSinglePitch = async (req, res, next) => {
  try {
    const getPitch = await PitchModel.findById(req.params.id)
    res.status(200).json(getPitch)
  } catch (error) {
    next(error)

  }
}

//update a pitch by id
export const updatePitches = async (req, res, next) => {
  try {
    // Validate request
    const { value, error } = addPitchValidator.validate(req.body);
    if (error) {
      return res.status(422).json(error);
    }
    // Update pitches
    const pitches = await PitchModel.findByIdAndUpdate(
      req.params.id,
      value,
      { new: true }
    );
    // Return response
    res.status(200).json(pitches);
  } catch (error) {
    next(error);
  }
}

//deleting  pitches by id
export const deletePitches = async (req, res, next) => {
  try {
    // Delete pitch
    await PitchModel.findByIdAndDelete(req.params.id);
    // Return response
    res.status(200).json('Pitch Deleted!');
  } catch (error) {
    next(error);
  }
}
