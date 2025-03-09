import { Company } from "../models/company.model.js";
import uploadFiltToCloudinary from "../utils/cloudinary.js";
import { handleRespone } from "../utils/responseHandler.js"

export const registerCompany = async  (req,res) => {
  try {
    const {companyName} = req.body;

    if(!companyName){
        return handleRespone(res, 400, false, "Company name is required")
    }
    const existingCompany = await Company.findOne({name:companyName})

     if(existingCompany){
        return handleRespone(res, 400, false, "company with this name already exists");
     }

     const company = await Company.create({
        name:companyName,
        userId:req.id
     });


     return handleRespone(res, 201, true, "company registred successfully", company)
  } catch (error) {
    return handleRespone(res, 500, false, "Error during register company")
  }
}

export const getCompany = async(req,res) => {
    try {
        const companies = await Company.find({userId:  req.id});
        if(!companies){
            return handleRespone(res, 400, false, "No comapny found")
        }
        return handleRespone(res, 200, true, "company retrieved successfully",  companies)
    } catch (error) {
        console.log(error)
        return handleRespone(res, 500, false, "Error during geting company")
    }
};

export const getCompanyByID = async(req,res) => {
    try {
        const company = await Company.findById(req.params.id);
        if(!company){
            return handleRespone(res, 400, false, "No comapny found")
        }
        return handleRespone(res, 200, true, "company retrieved successfully",  company)
    } catch (error) {
        console.log(error)
        return handleRespone(res, 500, false, "Error during geting company")
    }
};

export const updateCompany = async(req,res) => {
    try {
        const {name, location, description, website} = req.body;
        const file = req.file;

        const updateData = {};

        let cloudResponse;
        if(file){
          cloudResponse = await uploadFiltToCloudinary(file);
          if(!cloudResponse){
            return handleRespone(res, 400, false, "failed to upload file")
          }
          updateData.logo = cloudResponse.url
        }

        if(name) updateData.name = name;
        if(location) updateData.location = location;
        if(description) updateData.description = description;
        if(website) updateData.website = website;

        const comapny = await Company.findByIdAndUpdate(req.params.id, updateData, {new:true});
        if(!comapny){
            return handleRespone(res, 400, false, "company not found")
        }
        return handleRespone(res, 200, true, "company updated succesfully", comapny)
    } catch (error) {
        console.log(error)
        return handleRespone(res, 500, false, "Error during update company")
    }
}