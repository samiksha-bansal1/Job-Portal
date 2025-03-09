import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import { uploadFile } from "../middlewares/multer.middleware.js";
import isAuthenticate from "../middlewares/isAuthenticate.middleware.js";

const router = express.Router();



router.route("/register").post(uploadFile,register);
router.route("/login").post(login);
router.route("/logout").get(isAuthenticate,logout);
router.route("/update/profile").post(isAuthenticate,uploadFile,updateProfile);


export default router;