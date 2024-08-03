import joi from "joi"




export const addPitchValidator = joi.object({
  user: joi.string().required(),
  founderVideoUrl: joi.string(),
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