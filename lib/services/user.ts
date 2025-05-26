import api from "./api";

// get jobs list -user
export const getJobsList = async (
  page: number,
  limit: number,
  searchParam: any,
  jobSalary: any,
  jobLocation: any,
  datePosted: any,
  jobType: any,
  workPlaceType: any,
) => {
  try {
    const response = await api.get(`/jobs`, {
      params: {
        status: [`active`],
        search: searchParam,
        jobSalary: jobSalary,
        jobLocation: jobLocation,
        workPlaceType: workPlaceType,
        datePosted: datePosted,
        jobType: Array.isArray(jobType) ? jobType : [jobType],
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
    console.error("fetching jobs failed", error);
  }
};

export type FormDataProps = {
  firstName: string;
  lastName: string;
  email: string;
  description: string;
  resume: {
    fileName: string;
    storageName: string;
  } | null;
};
// apply job form
export const submitJobApplication = async (
  jobId: string,
  formData: FormDataProps,
) => {
  try {
    const response = await api.post(`/job-applications/${jobId}`, formData);

    return response.data;
  } catch (error) {
    console.error("Failed to submit job application");
    throw error;
  }
};

export const searchLocation = async (searchTerm: any, select: any) => {
  try {
    const response = await api.get(`/location/search?&country=United States(US)`, {
      params: { search: searchTerm, page: 1, limit: 200, select: select },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching location", error);
    throw error;
  }
};
