import { Company } from "../models/company.model.js";
import { handleRespone } from "../utils/responseHandler.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    if (!companyName) {
      return handleRespone(res, 400, false, "Company name is required");
    }

    const existingCompany = await Company.findOne({ name: companyName });

    if (existingCompany) {
      return handleRespone(
        res,
        400,
        false,
        "A company with this name already exists"
      );
    }

    const company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return handleRespone(
      res,
      201,
      true,
      "Company registered successfully",
      company
    );
  } catch (error) {
    return handleRespone(res, 500, false, "Error during company registration");
  }
};

export const getCompany = async (req, res) => {
  try {
    const companies = await Company.find({ userId: req.id });

    if (!companies || companies.length === 0) {
      return handleRespone(res, 400, false, "No company found");
    }

    return handleRespone(
      res,
      200,
      true,
      "Companies retrieved successfully",
      companies
    );
  } catch (error) {
    console.log(error);
    return handleRespone(res, 500, false, "Error retrieving companies");
  }
};

export const getCompanyByID = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return handleRespone(res, 400, false, "No company found");
    }

    return handleRespone(
      res,
      200,
      true,
      "Company retrieved successfully",
      company
    );
  } catch (error) {
    console.log(error);
    return handleRespone(res, 500, false, "Error retrieving company");
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, location, description, website } = req.body;

    const updateData = {};

    if (name) updateData.name = name;
    if (location) updateData.location = location;
    if (description) updateData.description = description;
    if (website) updateData.website = website;

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return handleRespone(res, 400, false, "Company not found");
    }

    return handleRespone(
      res,
      200,
      true,
      "Company updated successfully",
      company
    );
  } catch (error) {
    console.log(error);
    return handleRespone(res, 500, false, "Error updating company");
  }
};
