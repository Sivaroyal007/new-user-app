"use client";

import React, { useEffect, useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";
import ReviewSearchSection from "@/components/pages/ReviewPage/ReviewSearchSection";
import StarRating from "@/components/common/StarRating";
import ReviewCard from "@/components/pages/ReviewPage/ReviewCard";
import { ReviewDetailsCard } from "@/components/pages/ReviewPage/ReviewDetailsCard";
import { AddRatingForm1 } from "@/components/pages/ReviewPage/AddRatingForm1";
import HeroWrapper from "@/components/wrapper/HeroWrapper";
import { useGetCompanyById, usePaginatedReviewsList } from "@/lib/hooks/query";
import { useReviewContext } from "@/lib/context/ReviewContext";
import { useIsLargeScreen } from "@/lib/hooks/screenSizeCheck";
import NoResultFound from "@/components/common/LottieComponents/NoResultFound";
import Pagination from "@/components/common/Pagination";
import { JobReviewCardType } from "@/lib/types/ReviewTypes";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import backicon from "@/assets/icons/backicon.svg";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/lib/debounce";
import { roundToHalf } from "@/lib/Config";
import { trackPageVisit } from "@/lib/services/Tracking/tracking";

export type CompanyDataTypes = {
  _id: string;
  companyName: string;
  industry: string;
  employmentCount: string;
  location: string;
  jobTitles: any[];
  avgRating: number;
  reviewCount: number;
  status: string;
  createdAt: string;
};

const ComapanyRatingPage = ({ params }: { params: { companyId: string } }) => {

  useEffect(() => {
    trackPageVisit('review'); 
}, []);
  // const { setRatingValues } = useReviewContext();
  const { filterByRatingValues, setFilterByRatingValues, setRatingValues } =
    useReviewContext();
  const isLargeScreen = useIsLargeScreen();
  const [searchTerm, setSearchTerm] = useState("");
  // const [jobType, setJobType] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState(isLargeScreen ? 6 : 3);
  const [rating, setRating] = useState<number>();
  const [datePosted, setDatePosted] = useState("");
  const [selectedReview, setSelectedReview] =
    useState<JobReviewCardType | null>(null);
  const searchParams = useSearchParams();
  
  const initialSearch =
    searchParams?.get("search") === "false" ? "" : searchParams?.get("search");
  const { data: companyData, error } = useGetCompanyById(params.companyId);
  const debouncedSearchTerm = useDebounce(searchTerm || initialSearch, 500);
  const companyId = params.companyId;
  const { data: paginatedReviewsData, isPending } = usePaginatedReviewsList(
    currentPage,
    debouncedSearchTerm,
    // jobType,
    rating,
    datePosted,
    companyId,
    limit,
  );

  const openReviewCardRef = useRef(null);
  const openAddRatingCard1 = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (initialSearch !== undefined) {
      setSearchTerm(initialSearch || "");
    }
  }, [initialSearch]);

  useEffect(() => {
    if (debouncedSearchTerm !== undefined) {
      setCurrentPage(1);
    }
  }, [debouncedSearchTerm]);
  //  console.log(initialSearch,"SEARCH")
  const handleOpenAddRatingCard1 = () => {
    setRatingValues((prev: any) => ({ ...prev, company: params.companyId }));
    // console.log("clicked");
    if (openAddRatingCard1.current) {
      (openAddRatingCard1.current as HTMLButtonElement).click();
    }
  };

  const handleOpenReviewClick = (reviewData: JobReviewCardType) => {
    setSelectedReview(reviewData);
    if (openReviewCardRef.current) {
      (openReviewCardRef.current as HTMLButtonElement).click();
    }
  };

  useEffect(() => {
    setLimit(isLargeScreen ? 6 : 3);
  }, [isLargeScreen]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  function clearSearch() {
    setSearchTerm("");
    const resetValues = {
      datePosted: "",
      rating: 0,
    };
    setFilterByRatingValues(resetValues);
    handleSearchSubmit(resetValues);
    router.push(
      `${window.location.pathname}?${new URLSearchParams({
        ...Object.fromEntries(new URLSearchParams(window.location.search)),
        search: "",
      }).toString()}`
    );
  }
  function handleSearchChange() {}

  function handleSearchSubmit(filters: any) {
    // setJobType(filters.jobType);
    setDatePosted(filters.datePosted);
    setRating(filters.rating);
  }

  const totalPages = Math.ceil((paginatedReviewsData?.total || 0) / limit);

  return (
    <>
      <HeroWrapper className="h-[70px] lg:h-[124px]">
        <div className="flex w-full items-center justify-center bg-transparent px-[5vw] pt-[145px] lg:pt-[124px]" />
      </HeroWrapper>
      {/* section starts */}
      <div className="w-full px-[5vw]">
        <div
          onClick={() => router.back()}
          className="mb-[16px] mt-[32px] hidden cursor-pointer gap-[4px] px-4 md:flex"
        >
          <Image src={backicon} alt="close icon" width={24} height={24} />
          <span className="text-[16px] font-[700] text-primary">Go back</span>
        </div>
        <div
          className="mx-auto mb-[47px] mt-[30px] min-h-[140vh] w-full rounded-[8px] md:mt-0 md:max-w-[88vw] md:border-[1px] md:border-[#E7EBF1] md:p-[24px] lg:min-h-[120vh]"
          style={{ boxShadow: "0px 8px 35px 0px #0000000A" }}
        >
          {/* start */}
          <div className="flex flex-col justify-between md:flex-row">
            <h3 className="flex gap-2 text-[18px] font-[700] text-grayDark md:hidden">
              {roundToHalf(companyData?.avgRating).toFixed(1)}
              <StarRating fixedRating={roundToHalf(companyData?.avgRating)} />
            </h3>
            <div>
              <h1 className="mt-[2px] text-[24px] font-[600] text-[#121212] md:text-[32px] md:font-[700]">
                {companyData?.companyName}
              </h1>
              <h2 className="mt-[2px] text-[18px] font-[400] text-gray-light md:font-[500]">
                {companyData?.industry}
              </h2>
            </div>
            <div className="hidden items-end justify-between md:flex md:flex-col">
              <h3 className="flex gap-2 text-[24px] font-[600] text-grayDark">
                {roundToHalf(companyData?.avgRating).toFixed(1)}

                <StarRating fixedRating={roundToHalf(companyData?.avgRating)} />
              </h3>
              <div
                onClick={handleOpenAddRatingCard1}
                className="mt-[24px] max-w-[120px] cursor-pointer rounded-[8px] bg-primary px-[20px] py-[10px] text-[16px] font-[600] text-white"
              >
                Add rating
              </div>
            </div>
            <div
              onClick={handleOpenAddRatingCard1}
              className="mt-[24px] max-w-[120px] cursor-pointer rounded-[8px] bg-primary px-[20px] py-[10px] text-[16px] font-[600] text-white md:hidden"
            >
              Add rating
            </div>
          </div>

          <Separator className="my-[24px] h-[4px] rounded-[21px] text-[#F1F1F1]" />

          {/* search section >>>>>>>>>>>>>*/}
          <div id="searchSection" className="">
            <ReviewSearchSection
              onSearchChange={handleSearchChange}
              onSearchSubmit={handleSearchSubmit}
              setSearchInput={setSearchTerm}
              searchInput={searchTerm}
              clearSearch={clearSearch}
            />
          </div>
          {/* <<<<<<<<<<<<<<<<<search section  */}

          {/* >>>>>>>>>>>>>>review cards */}
          <div className="mt-[24px] grid grid-cols-1 gap-[12px] md:grid-cols-2">
            {isPending &&
              Array.from({ length: isLargeScreen ? 6 : 3 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-[200px] w-full rounded-[12px] bg-gray-100"
                />
              ))}

            {paginatedReviewsData?.data?.length === 0 ? (
              <div className="mx-auto mb-[13rem] mt-[4rem] flex h-full w-full items-center justify-center">
                <div className="g:max-w-[220px] absolute left-0 right-0 mx-auto w-[170px]">
                  <div className="">
                    <NoResultFound />
                    <div
                      className={`flex w-[220px] gap-2 ${searchTerm ? "-ml-6" : "ml-6"} `}
                    >
                      {searchTerm && (
                        <div
                          onClick={clearSearch}
                          className="cursor-pointer font-[700] text-primary"
                        >
                          Clear search
                        </div>
                      )}
                      <h3 className="text-center text-[900] text-primary">
                        No result found
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              paginatedReviewsData?.data?.map(
                (paginatedReviewData: JobReviewCardType, i: number) => (
                  <div
                    key={i}
                    onClick={() => handleOpenReviewClick(paginatedReviewData)}
                    className="activeBorder cursor-pointer"
                  >
                    <ReviewCard key={i} {...paginatedReviewData} />
                  </div>
                ),
              )
            )}
          </div>
          {/* <<<<<<<<<<<<<<<<<<review cards */}
          <div className="mt-[40px]">
            {paginatedReviewsData?.data?.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                limit={limit}
                onPageChange={handlePageChange}
                totalItems={paginatedReviewsData?.total || 0}
              />
            )}
          </div>
        </div>
      </div>

      <>
        <ReviewDetailsCard
          ref={openReviewCardRef}
          reviewData={selectedReview}
        />
      </>
      <AddRatingForm1 ref={openAddRatingCard1} />
    </>
  );
};

export default ComapanyRatingPage;
