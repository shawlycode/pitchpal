import multer from "multer";
import { multerSaveFilesOrg } from "multer-savefilesorg";


// Configure upload middleware
export const remoteUpload = multer({
  storage: multerSaveFilesOrg({
    apiAccessToken: process.env.SAVEFILESORG_API_KEY,
    relativePath: '/pitchpal/*'

  })
});