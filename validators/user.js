import joi from "joi";


export const registerValidator = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  role: joi.string().required()

})

export const loginValidator = joi.object({
  username: joi.string().alphanum(),
  email: joi.string().email(),
  password: joi.string().required()
})

