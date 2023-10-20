import { Router } from "express";
import { uploader } from "../middlewares/multer";
import {
  //deleteImage,
  getImage,
  getImages,
  uploadDocs,
  uploadProfileImage,
} from "../controllers/uploads";
import { validateJWT } from "../middlewares/validate-jwt";

export const uploadRouter = Router();

uploadRouter.use(validateJWT);

uploadRouter.post("/profile/:fullFileName", uploader, uploadProfileImage);
uploadRouter.post("/docs/:fullFileName", uploader, uploadDocs);
uploadRouter.get("/images", [], getImages);
uploadRouter.get("/user/:userId/img/:img", [], getImage);
//uploadRouter.delete("/user/:userId/img/:img", [], deleteImage);