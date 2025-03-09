import { Application } from "../models/applications.model.js";
import { handleRespone } from "../utils/responseHandler.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    if (!jobId) {
      return handleRespone(res, 400, false, "job id is required");
    }
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return handleRespone(
        res,
        400,
        false,
        "you have already applied for this job"
      );
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return handleRespone(res, 400, false, "no job found");
    }
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(newApplication._id);

    await job.save();

    return handleRespone(res, 200, true, "job Applied successfully");
  } catch (error) {
    console.log(error);
    return handleRespone(res, 500, false, "Error during apply job");
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;

    const application = await Application.find({ applicant: userId })
      .populate({
        path: "job",
        populate: { path: "company" },
      })
      .sort({ createdAt: -1 });

    return handleRespone(
      res,
      200,
      true,
      "applied jobs retrieved successfully",
      application
    );
  } catch (error) {
    console.log(error);
    return handleRespone(res, 500, false, "Error during getting applied job");
  }
};

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate({
      path: "applications",
      populate: "applicant",
    });

    if (!job) {
      return handleRespone(res, 400, false, "no job found");
    }

    return handleRespone(
      res,
      200,
      true,
      "applicants retrieved  successfully",
      job.applications
    );
  } catch (error) {
    console.log(error);
    return handleRespone(res, 500, false, "Error during getting Applicants");
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return handleRespone(res, 400, false, "status is required");
    }

    const application = await Application.findById(applicationId);

    if (!application) {
      return handleRespone(res, 400, false, "no application found");
    }

    application.status = status.toLowerCase();

    await application.save();

    return handleRespone(res, 200, true, "status updated successfully");
  } catch (error) {
    console.log(error);
    return handleRespone(res, 500, false, "Error during update status");
  }
};
