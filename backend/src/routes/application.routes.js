import express from "express";
import isAuthenticate from "../middlewares/isAuthenticate.middleware.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";

const router = express.Router();


router.route("/apply/:id").get(isAuthenticate, applyJob);
router.route("/get").get(isAuthenticate, getAppliedJobs);
router.route("/applicants/:id").get(isAuthenticate, getApplicants);
router.route("/status/update/:id").put(isAuthenticate, updateStatus);


export default router;