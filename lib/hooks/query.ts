import {
  QueryClient,
  UseMutationOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  FormDataProps,
  getJobsList,
  searchLocation,
  submitJobApplication,
} from "../services/user";

import { uploadFile } from "../services/fileUpload";
import {
  createCompany,
  CreateCompanyDataTypes,
  getCompaniesList,
  getCompanyById,
  getReviewsList,
  RatingDataTypes,
  submitRating,
} from "../services/rating";

// get active jobs list
export const useGetActiveJobs = (
  searchTerm: string,
  jobSalary: any,
  jobLocation: any,
  datePosted: any,
  jobType: any,
  workPlaceType: any,
) => {
  return useInfiniteQuery({
    queryKey: [
      "activeJobs",
      searchTerm,
      jobSalary,
      jobLocation,
      datePosted,
      jobType,
      workPlaceType,
    ],
    queryFn: ({ pageParam }) =>
      getJobsList(
        pageParam || 1,
        8,
        searchTerm,
        jobSalary,
        jobLocation,
        datePosted,
        jobType,
        workPlaceType,
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage?.page + 1;
      return nextPage <= Math.ceil(lastPage?.total / 8) ? nextPage : undefined;
    },
  });
};

// pagination query for prev -next type pagination- small screens
export const usePaginatedJobs = (
  page: number,
  searchTerm: string,
  jobSalary: any,
  jobLocation: any,
  datePosted: any,
  jobType: any,
  workPlaceType: any,
  limit: number = 3,
) => {
  return useQuery({
    queryKey: [
      "paginatedJobs",
      page,
      searchTerm,
      jobSalary,
      jobLocation,
      datePosted,
      jobType,
      workPlaceType,
    ],
    queryFn: () =>
      getJobsList(
        page,
        (limit = 3),
        searchTerm,
        jobSalary,
        jobLocation,
        datePosted,
        jobType,
        workPlaceType,
      ),
  });
};

// s3 file upload query
export const useFileUpload = (
  jobId: string,
  fileType: string,
  options?: UseMutationOptions<
    { fileName: string; storageName: string },
    Error,
    File
  >,
) => {
  return useMutation({
    mutationFn: (file: File) => uploadFile(file, jobId, fileType),
    ...options,
  });
};

// apply job form mutation
export const useSubmitJobApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { jobId: string; formData: FormDataProps }) =>
      submitJobApplication(data.jobId, data.formData),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["activeJobs"] });
    },
  });
};

// search location query
export const useSearchLocation = (searchTerm: any, select:any) => {
  return useQuery({
    queryKey: ["locationSearch", searchTerm,select],
    queryFn: () => searchLocation(searchTerm,select),
    enabled: true,
  });
};

// pagination query to get companies
export const usePaginatedCompaniesList = (
  page: number,
  searchTerm: string,
  searchType: string,
  limit: number,
) => {
  return useQuery({
    queryKey: ["paginatedCompaniesList", page, searchTerm, searchType, limit],
    queryFn: () => getCompaniesList(searchTerm, searchType, page, limit),
  });
};

// get company by id
export const useGetCompanyById = (companyId: string) => {
  return useQuery({
    queryKey: ["company", companyId],
    queryFn: () => getCompanyById(companyId),
  });
};

// submit add rating form
export const useSubmitRating = () => {
  return useMutation({
    mutationFn: (ratingData: RatingDataTypes) => submitRating(ratingData),
  });
};

// create company
export const useCreateCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (createCompanyData:CreateCompanyDataTypes) => createCompany(createCompanyData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paginatedCompaniesList"] });
    },
  })
}

// get paginated reviews list
export const usePaginatedReviewsList = (
  page: number,
  searchTerm: string,
  // jobType: string,
  rating:any,
  datePosted:string,
  companyId:string,
  limit: number,
) => {
  return useQuery({
    queryKey: ["paginatedReviewsList", page, searchTerm,rating,datePosted,companyId, limit],
    queryFn: () => getReviewsList(searchTerm,rating,datePosted,companyId, page, limit),
  });
};
