import joi from "joi";


export const registerValidator = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  confirmPassword: joi.ref('password'),
  role: joi.string().required()

})