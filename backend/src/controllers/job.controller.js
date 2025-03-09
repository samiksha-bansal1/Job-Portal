import { Job } from "../models/job.model.js";
import { handleRespone } from "../utils/responseHandler.js";

export const jobPost = async (req, res) => {
  try {
    const {
      title,
      description,
      salary,
      location,
      jobType,
      requirements,
      position,
      experience,
      companyId,
    } = req.body;
    const userId = req.id;

    if (
      !title ||
      !description ||
      !salary ||
      !location ||
      !jobType ||
      !requirements ||
      !position ||
      !experience ||
      !companyId
    ) {
      return handleRespone(res, 400, false, "All fields  are required");
    }

    const job = await Job.create({
      title,
      description,
      salary: Number(salary),
      location,
      jobType,
      requirements: requirements.split(",").map((req) => req.trim()),
      position: Number(position),
      experience: Number(experience),
      company: companyId,
      created_by: userId,
    });

    return handleRespone(res, 201, true, "Job created successfully", job);
  } catch (error) {
    console.log(error);
    return handleRespone(res, 500, false, "Error during post job");
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate({
        path: "company",
        select: "name logo",
      })
      .sort({ createdAt: -1 });

    if (!jobs.length) {
      return handleRespone(res, 400, false, "no job found");
    }

    return handleRespone(res, 200, true, " jobs retrieved succesffully", jobs);
  } catch (error) {
    console.log(error);
    return handleRespone(res, 500, false, "Error during getting all jobs");
  }
};


export const getJobById = async(req,res) =>{
    try {
        const jobId = req.params.id;
      
        const job = await Job.findById(jobId).populate({
          path:"applications"
        })

        if(!job){
            return handleRespone(res, 400, false, "no job found")
        }
      
        return handleRespone(res, 200, true, "job retrieved successfully", job)
    } catch (error) {
        console.log(error)
        return handleRespone(res, 500, false, "Error during getting job by id")
    }
}

export const getAdminJobs = async(req,res) => {
    try {
        const adminId = req.id;

        const jobs = await Job.find({created_by:adminId}).populate({
            path:"company",
            createdAt:-1
        });
        if(!jobs.length){
            return handleRespone(res, 400, false, "no jobs found")
        }
        return handleRespone(res, 200, true, "jobs retrieved successfully", jobs)
    } catch (error) {
        console.log(error)
        return handleRespone(res, 500, false, "error during getting admin jobs")
    }
}