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


export const pitchValidator = joi.object({
  user: joi.string().required(),
  founderVideoUrl: joi.string().required(),
  recordVideo: joi.string(),
  companyName: joi.string().required(),
  role: joi.string(),
  description: joi.string().required(),
  companyUrl: joi.string(),
  demoUrl: joi.string(),
  recordDemo: joi.string(),
  slidesUrl: joi.string(),
  fundingGoal: joi.string().required(),
  fundingAmount: joi.string(),
  status: joi.string(),
  productUrl: joi.string(),
  productDetails: joi.string(),
  ideation: joi.string(),
  competitors: joi.string(),
  forcastAmount: joi.string(),
  companyRegDocs: joi.string()

})