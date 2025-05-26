"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface JobContextProps {
  selectedJobId: string | null;
  setSelectedJobId: (user: string | null) => void;
  filterValues: {
    location: string;
    jobType: string;
    datePosted: string;
    salary: string;
    workPlaceType: string;
  };
  setFilterValues: React.Dispatch<
    React.SetStateAction<{
      location: string;
      jobType: string;
      datePosted: string;
      salary: string;
      workPlaceType: string;
    }>
  >;
  filtersApplied: boolean;
  setFiltersApplied: (value: boolean) => void;
}

const JobContext = createContext<JobContextProps | undefined>(undefined);

export const JobProvider = ({ children }: { children: ReactNode }) => {
  // const searchParams = useSearchParams();
  // const initialJobId = searchParams.get("jobId");
  const [selectedJobId, setSelectedJobId] = useState<string | null>(
    // initialJobId
    "",
  );
  const [filterValues, setFilterValues] = useState({
    location: "",
    jobType: "",
    datePosted: "",
    salary: "",
    workPlaceType: "",
  });

  const [filtersApplied, setFiltersApplied] = useState(false);

  return (
    <JobContext.Provider
      value={{
        selectedJobId,
        setSelectedJobId,
        filterValues,
        setFilterValues,
        filtersApplied,
        setFiltersApplied,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
