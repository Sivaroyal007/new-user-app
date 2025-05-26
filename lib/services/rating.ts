import { CompanyDataTypes } from "@/app/reviews/[companyId]/page";
import api from "./api";

// get all company list with rating data
export const getCompaniesList = async (
  searchParam: string,
  searchType: string,
  page: number,
  limit: number,
) => {
  try {
    const response = await api.get(`/companies`, {
      params: {
        search: searchParam,
        searchType: searchType,
        status: "approved",
        page: page,
        limit: limit,
      },
    });

    return {
      data: response.data.data,
      total: response.data.total,
      page: response.data.page,
      limit: response.data.limit,
    };
  } catch (error) {
    console.error("error fetching companies list", error);
    throw error;
  }
};

// Get company by ID
export const getCompanyById = async (
  companyId: string,
): Promise<CompanyDataTypes> => {
  try {
    const response = await api.get(`/companies/${companyId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching company by ID", error);
    throw error;
  }
};

export type RatingDataTypes = {
  company: string;
  jobType: string;
  jobTitle: string;
  applicationDate: string;
  noOfInterviews: number;
  noOfDays: number;
  hiringPlatform: string;
  otherHiringPlatform: string;
  title: string;
  description: string;
  rating: number;
};
// add review form
export const submitRating = async (ratingData: RatingDataTypes) => {
  try {
    const response = await api.post(`/reviews`, ratingData);
    return response.data.data;
  } catch (error) {
    console.error("failed to sub add rating form", error);
    throw error;
  }
};

export type CreateCompanyDataTypes = {
  companyName: string;
  industry: string;
  employmentCount: string;
  location: string;
};

// create company
export const createCompany = async (
  createCompanyData: CreateCompanyDataTypes,
) => {
  try {
    const response = await api.post(`/companies`, createCompanyData);

    return response.data.data;
  } catch (error) {
    console.error("Failed to create company", error);
    throw error;
  }
};

// get reviews list
export const getReviewsList = async (
  search: string,
  // jobType: string,
  rating:any,
  datePosted:string,
  companyId:string,
  page: number,
  limit: number,
) => {
  try {
    const response = await api.get(`/reviews`, {
      params: {
        search: search,
        // jobType: jobType,
        rating:rating,
        datePosted:datePosted,
        companyId:companyId,
        status: "active",
        page: page,
        limit: limit,
      },
    });

    return {
      data: response.data.data,
      total: response.data.total,
      page: response.data.page,
      limit: response.data.limit,
    };
  } catch (error) {
    console.error("error fetching companies list", error);
    throw error;
  }
};
