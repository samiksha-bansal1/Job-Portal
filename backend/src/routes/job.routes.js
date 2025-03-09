import express from "express";
import isAuthenticate from "../middlewares/isAuthenticate.middleware.js";
import { getAdminJobs, getAllJobs, getJobById, jobPost } from "../controllers/job.controller.js";

const router = express.Router();


router.route("/post").post(isAuthenticate, jobPost);
router.route("/get").get( getAllJobs);
router.route("/get/:id").get( getJobById);
router.route("/getadminjobs").get(isAuthenticate, getAdminJobs);


export default router;