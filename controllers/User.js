import bcrypt from 'bcrypt'
import { loginValidator, registerValidator, updateUserValidator } from '../validators/user.js'
import { UserModel } from '../models/User.js';
import jwt from "jsonwebtoken";

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
  try {
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
  } catch (error) {

  }

}



export const getUsers = async (req, res, next) => {
  try {
    // Get all users
    const users = await UserModel
      .find()
      .select({ password: false });
    // Return response
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

export const token = async (req, res, next) => {
  try {
    // Validate request
    const { value, error } = loginValidator.validate(req.body);
    if (error) {
      return res.status(422).json(error);
    }
    // Find a user with their unique identifier
    const user = await UserModel.findOne({
      $or: [
        { username: value.username },
        { email: value.email },
      ]
    });
    if (!user) {
      return res.status(401).json('User Not Found');
    }
    // Verify their password
    const correctPassword = bcrypt.compareSync(value.password, user.password);
    if (!correctPassword) {
      return res.status(401).json('Invalid Credentials');
    }
    // Create a token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_PRIVATE_KEY,
      { expiresIn: '7d' }
    );
    // Return response
    res.status(200).json({
      message: 'User Logged In',
      accessToken: token
    });
  } catch (error) {
    next(error);
  }
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

export const logout = async (req, res, next) => {
  try {
    //destroy user session
    await req.session.destroy();
    //return res
    res.status(200).json('User logged out');
  } catch (error) {
    next(error)

  }
}

export const updateUser = async (req, res, next) => {
  try {
    // Validate request
    const { value, error } = updateUserValidator.validate(req.body);
    if (error) {
      return res.status(422).json(error);
    }
    // Update user
    await UserModel.findByIdAndUpdate(
      req.params.id,
      value,
      { new: true }
    );
    // Return response
    res.status(200).json('User Updated');
  } catch (error) {
    next(error);
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    // Get user id from session or request
    const id = req.session?.user?.id || req?.user?.id;
    // Ensure user is not deleting themselves
    if (id === req.params.id) {
      return res.status(409).json('Cannot Delete Self');
    }
    // Delete user
    await UserModel.findByIdAndDelete(req.params.id);
    // Return response
    res.status(200).json('User Deleted');
  } catch (error) {
    next(error);
  }
}