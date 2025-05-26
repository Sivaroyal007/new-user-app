"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ReviewContextProps {
  //   selectedJobId: string | null;
  //   setSelectedJobId: (user: string | null) => void;
  filterValues: {
    jobType: string;
    datePosted: string;
  };
  setFilterValues: React.Dispatch<
    React.SetStateAction<{
      jobType: string;
      datePosted: string;
    }>
  >;
  filtersAppliedReview: boolean;
  setFiltersAppliedReview: (value: boolean) => void;
  ratingValues: any;
  setRatingValues: React.Dispatch<React.SetStateAction<any>>;
  setFilterByRatingValues: React.Dispatch<React.SetStateAction<any>>;
  filterByRatingValues: any;
}

const ReviewContext = createContext<ReviewContextProps | undefined>(undefined);

export const ReviewProvider = ({ children }: { children: ReactNode }) => {
  const [filterValues, setFilterValues] = useState({
    jobType: "",
    datePosted: "",
  });

  const [ratingValues, setRatingValues] = useState({
    // jobType: "",
    jobTitle: "",
    applicationDate: "",
    noOfDays: 0,
    hiringPlatform: "",
    otherHiringPlatform: "",
    noOfInterviews: 0,
    title: "",
    description: "",
    rating: 0,
    company: "",
  });

  const [filtersAppliedReview, setFiltersAppliedReview] = useState(false);

  const [filterByRatingValues, setFilterByRatingValues] = useState({
    // jobType: "",
    datePosted: "",
    rating: 0,
  });

  return (
    <ReviewContext.Provider
      value={{
        filterValues,
        setFilterValues,
        filtersAppliedReview,
        setFiltersAppliedReview,
        setRatingValues,
        ratingValues,
        filterByRatingValues,
        setFilterByRatingValues,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviewContext = () => {
  const context = useContext(ReviewContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
