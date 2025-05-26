"use client";

import React, { useEffect, useRef, useState } from "react";
import ReviewSearchAndFilter from "./ReviewSearchAndFilter";
import RatingCard, {
  companyDataProps,
} from "@/components/pages/ReviewPage/RatingCard";
import Link from "next/link";
import { usePaginatedCompaniesList } from "@/lib/hooks/query";
import { useIsLargeScreen } from "@/lib/hooks/screenSizeCheck";
import Pagination from "@/components/common/Pagination";
import NoResultFound from "@/components/common/LottieComponents/NoResultFound";
import { CreateCompany } from "../ReviewPage/CreateCompany";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/lib/debounce";
import { trackPageVisit } from "@/lib/services/Tracking/tracking";

const RatingSection = () => {
  const isLargeScreen = useIsLargeScreen();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("jobTitleAndCompany");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState(isLargeScreen ? 6 : 3);
  const openCreateCompanyCardRef = useRef(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    setLimit(isLargeScreen ? 6 : 3);
  }, [isLargeScreen]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, searchType]);

  useEffect(() => {
    trackPageVisit('review'); 
}, []);

  const { data: companiesData, isPending } = usePaginatedCompaniesList(
    currentPage,
    debouncedSearchTerm,
    searchType,
    limit,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil((companiesData?.total || 0) / limit);

  const handleOpenCreateCompanyCard = () => {
    // console.log("clicked");
    if (openCreateCompanyCardRef.current) {
      (openCreateCompanyCardRef.current as HTMLButtonElement).click();
    }
  };

  return (
    <>
      <section>
        <ReviewSearchAndFilter
          setSearchTerm={setSearchTerm}
          setSearchType={setSearchType}
          searchTerm={searchTerm}
          searchType={searchType}
        />
        <div className={`mt-[32px] md:min-h-[80vh]`}>
        

          {companiesData?.data?.length === 0 ? (
            <div className="mx-auto mb-[8rem] mt-[40vw] flex h-full w-full items-center justify-center lg:mt-[17vw]">
              <div className="absolute left-0 right-0 mx-auto w-[150px] lg:w-[200px]">
                <div className="relative">
                  <NoResultFound />
                  <div className="absolute -bottom-8 -left-8 right-0 mx-auto flex w-[220px] flex-col gap-2 text-center lg:-left-20 lg:bottom-0 lg:w-[470px] lg:flex-row lg:text-start">
                    <h3 className="text-[900] text-primary">
                      No result for {searchTerm} ?
                    </h3>
                    <div
                      onClick={handleOpenCreateCompanyCard}
                      className="w-[220px] cursor-pointer text-[16px] font-[800] text-primary underline lg:w-[270px]"
                    >
                      Create company and rate ?
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : isPending ? (
            <div className="grid w-full grid-cols-1 gap-x-[16px] gap-y-[16px] lg:grid-cols-2 lg:gap-y-[24px]">
              {Array.from({ length: isLargeScreen ? 6 : 3 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-[190px] w-full rounded-[12px] bg-gray-100"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-[16px] gap-y-[16px] lg:grid-cols-2 lg:gap-y-[24px]">
              {companiesData?.data?.map(
                (companyData: companyDataProps, i: number) => (
                  <Link
                    href={`reviews/${companyData?._id}?search=${companyData?.jobTitles?.length > 0 && searchTerm}`}
                    key={i}
                  >
                    <RatingCard {...companyData} />
                  </Link>
                ),
              )}
            </div>
          )}
        </div>
        <div className="mt-[40px]">
          {companiesData?.data?.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              limit={limit}
              onPageChange={handlePageChange}
              totalItems={companiesData?.total || 0}
            />
          )}
        </div>
      </section>
      <CreateCompany ref={openCreateCompanyCardRef} />
    </>
  );
};

export default RatingSection;
