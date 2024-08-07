
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

export const deletePitch = async (req, res, next) => {
  try {
    const userSessionId = req.session.user.id;
    const user = await PitchModel.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    const pitch = await PitchModel.findByIdAndDelete(req.params.id);
    if (!profile) {
      return res.status(404).send("pitch not found");
    }

    user.pitch.pull(req.params.id);
    await user.save();

    res.status(200).json("pitch deleted");
  } catch (error) {
    next(error)
    // return res.status(500).json({ error })
  }
};
