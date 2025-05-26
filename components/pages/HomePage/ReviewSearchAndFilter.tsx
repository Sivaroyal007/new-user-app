"use client";

import Image from "next/image";
import search from "@/assets/svg/searchIcon.svg";
import close from "@/assets/svg/mi_close.svg";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Form, Formik } from "formik";
import { Checkbox } from "@/components/ui/checkbox";

const filterDropdownConstant = [
  { label: "Companies & Job titles", value: "jobTitleAndCompany" },
  { label: "Companies", value: "company" },
  { label: "Job titles", value: "jobTitle" },
];

interface ReviewSearchAndFilterProps {
  setSearchTerm: (term: string) => void;
  setSearchType: (type: string) => void;
  searchTerm: string;
  searchType: string;
}

const ReviewSearchAndFilter: React.FC<ReviewSearchAndFilterProps> = ({
  setSearchTerm,
  setSearchType,
  searchTerm,
  searchType,
}) => {
  const [filterValues, setFilterValues] = useState({
    companies: true,
    jobTitles: true,
  });

  useEffect(() => {
    if (filterValues.companies && filterValues.jobTitles) {
      setSearchType("jobTitleAndCompany");
    } else if (filterValues.companies) {
      setSearchType("company");
    } else if (filterValues.jobTitles) {
      setSearchType("jobTitle");
    }
    setFiltersApplied(filterValues.companies || filterValues.jobTitles);
  }, [filterValues, setSearchType]);

  const handleRatingFilterSubmit = (values: any) => {
    setFilterValues(values);
    console.log("Filter Values:", values);
  };

  const [filtersApplied, setFiltersApplied] = useState(false);

  const handleClearSearch = () => {
    setSearchTerm("")
   
  };

  return (
    <div className="mx-auto flex w-full max-w-[900px] items-center justify-center gap-[8px]">
      {/* //////////search box//////////////// */}
      <div
        className="flex w-full gap-[24px] rounded-[8px] border-[1px] border-[#D0D9E9] p-[16px] text-label-gray"
        style={{ boxShadow: "0px 8px 26.4px 0px #0000000D" }}
      >
        <Image
          src={search}
          alt="search icon"
          //   onClick={onSearchSubmit}
          className="cursor-pointer"
        />
        <input
          placeholder="Search"
          type="text"
          value={searchTerm}
          onChange={(e) => {
            // onSearchChange(e);
            setSearchTerm(e.target.value);
          }}
          //   onKeyDown={handleKeyDown}
          className="h-full w-full text-[16px]"
        />
        {!!searchTerm && (
          <button
          onClick={handleClearSearch}
          >
            <Image
              src={close}
              alt="search icon"
              //   onClick={onSearchSubmit}
              className="cursor-pointer"
            />
          </button>
        )}
      </div>
      {/* //////////search box ends//////////////// */}

      <div className="hidden w-full max-w-[245px] md:flex ">
        <Select
          onValueChange={(value) => setSearchType(value)}
          value={searchType}
        >
          <SelectTrigger className=" w-full">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {filterDropdownConstant.map((type: any, index) => (
                <SelectItem
                  value={type.value}
                  key={index}
                  className="cursor-pointer"
                >
                  {type.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* small screen filter */}

      <Sheet>
        <SheetTrigger asChild>
          <IoFilter
            className={` ${
              filtersApplied
                ? "border-[2px] border-primary font-[900] text-primary"
                : ""
            } hover:text-gray-normal-700 h-[54px] w-[64px] cursor-pointer rounded-[8px] border-[1px] border-[#D0D9E9] p-[13px] text-label-gray md:hidden`}
            style={{ boxShadow: "0px 8px 26.4px 0px #0000000D" }}
          />
        </SheetTrigger>
        <SheetContent side={"bottom"} className="p-[24px] md:hidden">
          {/* <DialogHeader> */}
          <SheetTitle className="text-center text-[24px] font-[700] text-brand-black">
            Filter what to view
          </SheetTitle>

          <Separator className="mb-[26px] mt-[16px] h-[2px] rounded-[21px] text-[#F1F1F1]" />
          {/* <DialogDescription> */}
          <div>
            <Formik
              initialValues={filterValues}
              onSubmit={handleRatingFilterSubmit}
            >
              {({ setFieldValue, values, handleChange }) => (
                <Form>
                  <div className="flex w-full justify-between">
                    <label className="text-[18px] font-[600] text-[#121212]">
                      View companies only
                    </label>
                    <Checkbox
                      className="font-[800] text-white"
                      name="companies"
                      checked={values.companies}
                      onCheckedChange={(checked) => {
                        handleChange({
                          target: {
                            name: "companies",
                            value: checked,
                          },
                        });
                      }}
                    />
                  </div>
                  <div className="mb-[20px] mt-[32px] flex w-full justify-between">
                    <label className="text-[18px] font-[600] text-[#121212]">
                      View job titles only
                    </label>
                    <Checkbox
                      className="font-[800] text-white"
                      name="jobTitles"
                      checked={values.jobTitles}
                      onCheckedChange={(checked) => {
                        handleChange({
                          target: {
                            name: "jobTitles",
                            value: checked,
                          },
                        });
                      }}
                    />
                  </div>

                  <SheetFooter className="flex w-full">
                    <div className="mt-[40px] flex w-full gap-4">
                      <SheetClose asChild className="w-1/2">
                        <button
                          type="button"
                          className="w-1/2 rounded-[8px] bg-white px-[20px] py-[10px] text-[16px] font-[600] text-label-gray hover:bg-gray-100"
                        >
                          Cancel
                        </button>
                      </SheetClose>

                      <SheetClose className="w-1/2">
                        <button
                          type="submit"
                          className="w-full rounded-[8px] bg-primary px-[20px] py-[10px] text-[16px] font-[600] text-white"
                        >
                          Done
                        </button>
                      </SheetClose>
                    </div>
                  </SheetFooter>
                </Form>
              )}
            </Formik>
          </div>
          {/* </DialogDescription> */}
          {/* </DialogHeader> */}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ReviewSearchAndFilter;
