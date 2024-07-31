import bcrypt from 'bcrypt'
import { registerValidator } from '../validators/user.js'
import { UserModel } from '../models/User.js';

export const register = async (req, res, next) => {
  //validate req

  try {
    const { value, error } = registerValidator.validate(req.body);
    if (error) {
      return res.status(422).json(error);
    }
    //encrypt user password
    const hashedPassword = bcrypt.hashSync(value.password, 10);
    //create user
    await UserModel.create({
      ...value,
      password: hashedPassword,
    });
    //return response
    res.status(201).json('User registered')
  } catch (error) {
    next(error)
  }

};
