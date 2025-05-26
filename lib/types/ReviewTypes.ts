type Company = {
    _id: string;
    companyName: string;
    industry: string;
    employmentCount: string;
    location: string;
    jobTitles: string[];
    avgRating: number;
    reviewCount: number;
    status: string;
    createdAt: string;
   
  };
  
 export type JobReviewCardType = {
    _id: string;
    company: Company;
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
    status: string;
    createdAt: string;
    
    
  };