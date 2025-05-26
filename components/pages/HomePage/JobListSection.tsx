"use client";

import React, { useEffect, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchSection from "./SearchSection";
import JobCard from "./JobCard";
import JobDetailsCard from "./JobDetailsCard";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetActiveJobs, usePaginatedJobs } from "@/lib/hooks/query";
import { useIsLargeScreen } from "@/lib/hooks/screenSizeCheck";
import Pagination from "@/components/common/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import NoResultFound from "@/components/common/LottieComponents/NoResultFound";
import RatingSection from "./ReviewSection";
import { useJobContext } from "@/lib/context/JobContext";
import UnderDevelopment from "@/components/common/LottieComponents/UnderDevelopment";
import { useDebounce } from "@/lib/debounce";
import { trackPageVisit } from "@/lib/services/Tracking/tracking";

const JobListSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialJobId = searchParams.get("jobId") || "";
  // const [selectedJobId, setSelectedJobId] = useState<string | null>(
  //   initialJobId
  // );
  const {
    selectedJobId,
    setSelectedJobId,
    filterValues,
    setFilterValues,
    filtersApplied,
    setFiltersApplied,
  } = useJobContext();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [jobSalary, setJobSalary] = useState<any>(null);
  const [jobLocation, setJobLocation] = useState<any>(null);
  const [datePosted, setDatePosted] = useState<any>(null);
  const [jobType, setJobType] = useState<any>(null);
  const [workPlaceType, setWorkPlaceType] = useState<any>(null);
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
  } = useGetActiveJobs(
    debouncedSearchTerm,
    jobSalary,
    jobLocation,
    datePosted,
    jobType,
    workPlaceType,
  );

  const {
    data: paginatedData,
    isPending: isPaginatedLoading,
    isError: isPaginatedError,
  } = usePaginatedJobs(
    currentPage,
    debouncedSearchTerm,
    jobSalary,
    jobLocation,
    datePosted,
    jobType,
    workPlaceType,
    3,
  );
  const jobListRef = useRef<HTMLDivElement | null>(null);
  const scrollPositionRef = useRef<number>(0);
  const closeJobDetailsRef = useRef<HTMLButtonElement>(null);
  const isLargeScreen = useIsLargeScreen();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (filters: any) => {
    setJobSalary(filters.salary);
    setJobLocation(filters.location);
    setJobType(filters.jobType);
    setDatePosted(filters.datePosted);
    setWorkPlaceType(filters.workPlaceType);
    // setSearchTerm(filters.searchTerm);
    setCurrentPage(1);
  };
  // console.log(selectedJobId, "JOB IDD");

  const handleJobCardClick = (
    jobId: string,
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    event.preventDefault();
    scrollPositionRef.current = window.scrollY;
    setSelectedJobId(jobId);
    router.push(`?jobId=${jobId}`, { scroll: false });
  };

  // console.log(selectedJobId,"ID")
  // console.log(initialJobId,"INITIAL ID")
  useEffect(() => {
    if (initialJobId) {
      // console.log("ok");
      setSelectedJobId(initialJobId);
    } else if (data?.pages[0]?.data?.length > 0 && isLargeScreen) {
      const firstJobId = data?.pages[0]?.data[0]?._id;
      setSelectedJobId(firstJobId);
      router.push(`?jobId=${firstJobId}`, { scroll: false });
    }
  }, [initialJobId, data, isLargeScreen, setSelectedJobId]);




  useEffect(() => {
    if (
      searchTerm ||
      jobSalary ||
      jobLocation ||
      datePosted ||
      jobType ||
      workPlaceType
    ) {
      if (data?.pages[0]?.data?.length > 0 && isLargeScreen) {
        const firstJobId = data?.pages[0]?.data[0]?._id;
        setSelectedJobId(firstJobId);
        router.push(`?jobId=${firstJobId}`, { scroll: false });
      }
      setCurrentPage(1);
    }
  }, [
    searchTerm,
    jobSalary,
    jobLocation,
    datePosted,
    jobType,
    workPlaceType,
    data,
    isLargeScreen,
    setSelectedJobId,
    router,
  ]);
  // ///////////////////////render job cards///////////////

  const renderJobCards = () => {
    if (isPending || isPaginatedLoading)
      return (
        <div className="flex flex-col gap-4">
          {[1, 1, 1].map((index) => (
            <Skeleton
              key={index}
              className="h-[200px] w-full rounded-[12px] bg-gray-100 md:h-[250px]"
            />
          ))}
        </div>
      );
    if (isError || isPaginatedError) return <p>Error fetching jobs</p>;

    let jobs: any[] = [];

    if (currentPage === 1 && data && isLargeScreen) {
      // Concatenate all pages if using infinite query on first page
      jobs = data?.pages.flatMap((page) => page?.data);
    } else if (paginatedData) {
      // Use paginated data directly for specific page number
      jobs = paginatedData?.data;
    }
    return jobs?.length === 0 ? (
      isLargeScreen ? (
   
      ""
      ) : (
        <div className=" flex justify-center items-center w-full h-full mt-8 ">
          <div className="w-[200px] relative ">
            <NoResultFound />
            <div className="absolute bottom-0 flex gap-1 w-[220px] mx-auto justify-center text-center">
             
              <h3 className="text-primary  text-center  text-[900]">No results found</h3>
              {!filtersApplied && !searchTerm ? "" : <button
                onClick={clearSearch}
                className="text-primary  font-[700]"
              >
                Clear search
              </button>}
           
            </div>
          </div>
        </div>
      )
    ) : (
      jobs?.map((job: any) => (
        <div
          key={job?._id}
          className={`activeBorder cursor-pointer ${
            job?._id === selectedJobId ? "border-[2px] border-primary" : ""
          } `}
          onClick={(event) => handleJobCardClick(job?._id, event)}
        >
          <JobCard key={job?._id} job={job} />
        </div>
      ))
    );
  };

  const renderJobDetailsCard = () => {
    if (isPending || isPaginatedLoading)
      return (
        <div className="w-full">
          <Skeleton className="hidden h-full max-h-[745px] w-full rounded-[8px] bg-gray-100 lg:flex" />
        </div>
      );
    // if (!selectedJobId) return null;
    // if (isError || isPaginatedError) return <p>Error fetching jobs</p>;

    let jobs: any[] = [];

    if (currentPage === 1 && data && isLargeScreen) {
      jobs = data?.pages?.flatMap((page) => page?.data);
    } else if (paginatedData) {
      jobs = paginatedData?.data;
    }

    return jobs?.length === 0 ? (
      <div className="mt-8 flex h-full w-full items-center justify-center">
        <div className="absolute left-[43%] right-[57%] w-[200px]">
          <div className="relative">
            <NoResultFound />
            <div className="flex gap-2 absolute bottom-0 w-[220px]">
              <h3 className={`text-primary text-center text-[900] ${!filtersApplied && !searchTerm ? "ml-8": ""} `}>
                0 jobs found ?
              </h3>
              {!filtersApplied && !searchTerm ? "" :
               <button
                onClick={clearSearch}
                className="text-primary  font-[700]"
              >
                Clear search
              </button>
              }
            </div>
          </div>
        </div>
      </div>
    ) : isLargeScreen ? (
      selectedJobId && (
        <div
          className="hidden h-[752px] w-full rounded-[8px] border-[1px] border-[#E7EBF1] p-[24px] lg:flex"
          style={{ boxShadow: "0px 8px 35px 0px #0000000A" }}
        >
          <JobDetailsCard
            handleCloseJobDetailsClick={handleCloseJobDetailsClick}
            job={jobs?.find((job: any) => job?._id === selectedJobId)}
          />
        </div>
      )
    ) : (
      selectedJobId && (
        <JobDetailsCard
          handleCloseJobDetailsClick={handleCloseJobDetailsClick}
          job={jobs?.find((job: any) => job?._id === selectedJobId)}
        />
      )
    );
  };
  //  //////////////////////render job details cards end///////////

  const handleFetchNextPage = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = () => {
    const jobListDiv = jobListRef.current;
    if (!jobListDiv) return;

    if (isPending || !hasNextPage) return;

    if (
      jobListDiv.scrollTop + jobListDiv.clientHeight >=
      jobListDiv.scrollHeight - 100
    ) {
      console.log("OK");
      // return ;
      handleFetchNextPage();
    }
  };

  useEffect(() => {
    if (!isLargeScreen && selectedJobId) {
      const openSheetButton = document.getElementById("openSheetBtn");
      if (openSheetButton) {
        openSheetButton.click();
      }
    }
  }, [isLargeScreen, selectedJobId]);

  useEffect(() => {
    // if (!hasNextPage) return;
    const jobListDiv = jobListRef.current;
    if (!jobListDiv) return;

    jobListDiv.addEventListener("scroll", handleScroll);
    return () => jobListDiv.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // handle numbered page click
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };



  const handleCloseJobDetailsClick = () => {
    setSelectedJobId("");
    router.replace("/", { scroll: false });
    closeJobDetailsRef.current?.click();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScrollBar = () => {
    if (jobListRef.current) {
      jobListRef.current.classList.add("scrolling");
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScrollStop = () => {
    if (jobListRef.current) {
      clearTimeout((jobListRef.current as any).scrollTimeout);
      (jobListRef.current as any).scrollTimeout = setTimeout(() => {
        if (jobListRef.current) {
          jobListRef.current.classList.remove("scrolling");
        }
      }, 1000);
    }
  };

  useEffect(() => {
    const ref = jobListRef.current;
    if (ref) {
      ref.addEventListener("scroll", handleScrollBar);
      ref.addEventListener("scroll", handleScrollStop);
      return () => {
        ref.removeEventListener("scroll", handleScrollBar);
        ref.removeEventListener("scroll", handleScrollStop);
      };
    }
  }, [handleScrollBar, handleScrollStop]);

  const totalPages = Math.ceil((paginatedData?.total || 0) / 3);

  const clearSearch = () => {
    setSearchInput("");
    setSearchTerm("");
    const resetValues = {
      location: "",
      jobType: "",
      datePosted: "",
      salary: "",
      workPlaceType: "",
    };
    setFilterValues(resetValues);
    handleSearchSubmit(resetValues);
    router.push("/", { scroll: false });
  };

  // tab toggle control
  const activeTab = searchParams.get("tab") || "classified"; // Default to 'jobs' tab if no query param is set

  const handleTabChange = (tab: string) => {
    router.push(`?jobId=${selectedJobId || ''}&tab=${tab}`);

    if (tab === "classified") {
      trackPageVisit("job", selectedJobId || "");
    } else {
      trackPageVisit("review");
    }
  };



  useEffect(() => {
    trackPageVisit(
      activeTab === "classified" ? "job" : "review",
      activeTab === "classified" ? (initialJobId || selectedJobId || "") : ""
    );
    // if(activeTab === "classified" ) {
    // trackPageVisit("job",selectedJobId || "")
 
    // }else if(activeTab === "review") {
    //   trackPageVisit("review")
      
    // }
  }, [selectedJobId, activeTab, initialJobId]);

  return (
    <div className="w-full">
      <div className="mx-auto mt-[-26px] flex w-full items-center justify-center gap-4">
        <Tabs
          // defaultValue="classified"
          value={activeTab}
          onValueChange={handleTabChange}
          className="relative flex w-full flex-col"
        >
          <TabsList
            id="tabList"
            className="mx-auto flex justify-center gap-[8px] rounded-[8px] border-[1px] border-[#9CABC7] p-[4px]"
          >
            <TabsTrigger
              value="classified"
              className="w-[150px] rounded-[8px] bg-white px-[24px] py-[10px] text-[14px] font-[700] lg:w-[200px] lg:text-[17px]"
            >
              Classified
            </TabsTrigger>
            <TabsTrigger
              value="review"
              className="w-[150px] rounded-[8px] bg-white px-[24px] py-[10px] text-[14px] font-[700] lg:w-[200px] lg:text-[17px]"
            >
              Hiring Feedback
            </TabsTrigger>
          </TabsList>

          <div
            // ref={contentRef}
            className="mb-[40px] md:mb-[65px] mt-[32px] w-full md:mt-[50px]"
          >
            <TabsContent
              value="classified"
              className="flex w-full gap-[20px] xl:gap-[48px]"
            >
              <div className="w-full lg:w-full xl:w-[48%]">
                <div id="searchSection" className="">
                  <SearchSection
                    onSearchChange={handleSearchChange}
                    onSearchSubmit={handleSearchSubmit}
                    setSearchInput={setSearchInput}
                    searchInput={searchInput}
                    clearSearch={clearSearch}
                  />
                </div>
                <ScrollArea
                  type="scroll"
                  scrollHideDelay={600}
                  ref={jobListRef}
                  className="overflow-hidden-scrollbar mt-[16px] overflow-x-hidden whitespace-nowrap lg:h-[674px] lg:overflow-y-auto"
                  // ref={jobListRef}
                  // className=" mt-[16px] flex flex-col gap-[8px] md:gap-[12px] lg:h-[674px]  lg:overflow-y-auto overflow-x-hidden overflow-hidden-scrollbar"
                >
                  <div className="flex flex-col gap-[8px] md:gap-[12px] lg:mr-3">
                    {renderJobCards()}
                    {/* {renderLoadMoreButton()} */}
                    {!isLargeScreen && (
                      <Pagination
                        currentPage={currentPage}
                        // totalPages={data?.pages[0]?.total / 3}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        limit={3}
                        totalItems={paginatedData?.total || 0}
                      />
                    )}
                  </div>
                  <ScrollBar orientation="vertical" className="-mr-4" />
                </ScrollArea>
              </div>

              <div
                className="hidden w-full rounded-[8px] lg:flex lg:h-[752px] xl:w-[54%]"
                // className="hidden w-full border-[1px] border-[#E7EBF1] rounded-[8px] p-[24px] lg:flex  xl:w-[52%] h-[752px] "
                // style={{ boxShadow: "0px 8px 35px 0px #0000000A" }}
              >
                {renderJobDetailsCard()}
              </div>
            </TabsContent>
            <TabsContent value="review" className="w-full">
              <div className="w-full">
                <RatingSection /> 
               {/* <div className="w-[170px] mx-auto mt-[10vh]">
               <UnderDevelopment />
               <h2 className="font-[700] text-center text-primary">under developement</h2>
               </div> */}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
      {!isLargeScreen && selectedJobId && (
        <Sheet>
          <SheetTrigger>
            <span className="hidden" id="openSheetBtn">
              Open Sheet
            </span>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className=""
            onInteractOutside={(e) => {
              // e.preventDefault();
              router.push("/", { scroll: false });
              setSelectedJobId("");
            }}
          >
            <div>{renderJobDetailsCard()}</div>
            <SheetClose ref={closeJobDetailsRef} className="hidden">
              close job details card
            </SheetClose>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default JobListSection;
