import express from "express"
import isAuthenticate from "../middlewares/isAuthenticate.middleware.js";
import { uploadFile } from "../middlewares/multer.middleware.js";
import { getCompany, getCompanyByID, registerCompany, updateCompany } from "../controllers/company.controller.js";

const router = express.Router();


router.route("/register").post(isAuthenticate, uploadFile, registerCompany);
router.route("/get").get(isAuthenticate, getCompany);
router.route("/get/:id").get(isAuthenticate, getCompanyByID);
router.route("/update/:id").post(isAuthenticate, uploadFile, updateCompany);

export  default router