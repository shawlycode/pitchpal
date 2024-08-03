import bcrypt from 'bcrypt'
import { loginValidator, registerValidator } from '../validators/user.js'
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

export const login = async (req, res, next) => {
  //validate request
  const { value, error } = loginValidator.validate(req.body);
  if (error) {
    return res.status(422).json(error)
  }
  //find user with identifier
  const user = await UserModel.findOne({
    $or: [
      { username: value.username },
      { email: value.email }
    ]
  });
  if (!user) {
    return res.status(401).json('User not Found')
  }
  //verify password
  const correctPassword = bcrypt.compareSync(value.password, user.password);
  if (!correctPassword) {
    return res.status(401).json('Invalid Credentials')
  }
  //create res
  req.session.user = { id: user.id }
  //return res
  res.status(200).json('User Logged in')

}

export const profile = async (req, res, next) => {
  try {
    //get user id from session
    const id = req.session.user.id;
    //find user by id
    const user = await UserModel.findById(id)
      .select({ password: false })
    //return response
    res.status(200).json(user);
  } catch (error) {
    next(error)
  }
}