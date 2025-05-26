"use client";

import React, { useEffect, useRef, useState } from "react";

import { IoFilter } from "react-icons/io5";
// import Button1 from "../common/Button";
import { FiPlus } from "react-icons/fi";
import search from "@/assets/svg/searchIcon.svg";
import Image from "next/image";
import close from "@/assets/svg/mi_close.svg";
// popup imports
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Field, Form, Formik } from "formik";

import * as Yup from "yup";
import { SearchWithDropdown } from "@/components/common/SearchWithDropdown";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsLargeScreen } from "@/lib/hooks/screenSizeCheck";
import { useJobContext } from "@/lib/context/JobContext";
import { useRouter } from "next/navigation";

type SearchSectionProps = {
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (filter: any) => void;
  searchInput: string;
  setSearchInput: (value: string) => void;
  clearSearch: () => void;
};

const JobFormSchema = Yup.object().shape({
  salary: Yup.number().typeError("Salary must be a number"),
});

const SearchSection: React.FC<SearchSectionProps> = ({
  onSearchChange,
  onSearchSubmit,
  setSearchInput,
  searchInput,
  clearSearch,
}) => {
  const dialogTriggerRef = useRef(null);

  const closeFilterRef = useRef(null);
  const router = useRouter();
  const [filterCount, setFilterCount] = useState(0);
  const { filterValues, setFilterValues, filtersApplied, setFiltersApplied } =
    useJobContext();

  // const [filterValues, setFilterValues] = useState({
  //   location: "",
  //   jobType: "",
  //   datePosted: "",
  //   salary: "",
  //   workPlaceType: ""
  // });

  // const [filtersApplied, setFiltersApplied] = useState(false);

  useEffect(() => {
    const { location, jobType, datePosted, salary, workPlaceType } =
      filterValues;
    setFiltersApplied(
      !!location || !!jobType || !!datePosted || !!salary || !!workPlaceType,
    );

    const count = [location, jobType, datePosted, salary, workPlaceType].filter(
      Boolean,
    ).length;
    setFilterCount(count);
  }, [filterValues]);

  const handleJobFilterClick = () => {
    if (dialogTriggerRef.current) {
      (dialogTriggerRef.current as HTMLButtonElement).click();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // onSearchSubmit({});
      // onSearchSubmit({ query: searchInput });
    }
  };

  const handleFilterSubmit = (values: any, { resetForm }: any) => {
    onSearchSubmit(values);
    setFilterValues(values);
    // console.log(values, "VALUE");
    resetForm();
    if (closeFilterRef.current) {
      (closeFilterRef.current as HTMLButtonElement).click();
    }
  };

  const handleClearFilters = (resetForm: any, setFieldValue: any) => {
    const resetValues = {
      location: "",
      jobType: "",
      datePosted: "",
      salary: "",
      workPlaceType: "",
    };
    resetForm({ values: resetValues });
    setFilterValues(resetValues);
    onSearchSubmit(resetValues);
  };

  const handleClearSearch = () => {
    // setSearchInput("");

    onSearchSubmit({});
    clearSearch();
  };

  return (
    <>
      <section className="flex w-full justify-between">
        <div className="flex w-full items-center gap-[8px]">
          {/* <SearchBox /> */}
          <section
            className="flex w-full gap-[24px] rounded-[8px] border-[1px] border-[#D0D9E9] p-[16px] text-label-gray"
            style={{ boxShadow: "0px 8px 26.4px 0px #0000000D" }}
          >
            <Image
              src={search}
              alt="search icon"
              onClick={onSearchSubmit}
              className="cursor-pointer"
            />
            <input
              placeholder="Search"
              type="text"
              // onChange={onSearchChange}
              value={searchInput}
              onChange={(e) => {
                onSearchChange(e);
                setSearchInput(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              className="h-full w-full text-[16px]"
            />
            {!!searchInput && (
              <button onClick={handleClearSearch}>
                <Image
                  src={close}
                  alt="search icon"
                  onClick={onSearchSubmit}
                  className="cursor-pointer"
                />
              </button>
            )}
          </section>
          {/* search box ends */}
          <div className="relative">
            <IoFilter
              onClick={handleJobFilterClick}
              className={` ${
                filtersApplied
                  ? "border-[2px] border-primary font-[900] text-primary"
                  : ""
              } hover:text-gray-normal-700 h-[54px] w-[64px] cursor-pointer rounded-[8px] border-[1px] border-[#D0D9E9] p-[13px] text-label-gray`}
              style={{ boxShadow: "0px 8px 26.4px 0px #0000000D" }}
            />
            {filterCount > 0 && (
              <div className="absolute -right-1 -top-1 flex h-[14px] w-[14px] items-center justify-center rounded-[35px] bg-primary p-[8px] text-center text-[10px] font-[800] text-white">
                {filterCount}
              </div>
            )}
          </div>
        </div>
      </section>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" ref={dialogTriggerRef} className="hidden">
            open
          </Button>
        </SheetTrigger>
        <SheetContent
          side={useIsLargeScreen() ? "center" : "bottom"}
          className="p-[24px] lg:max-w-[570px]"
        >
          {/* <DialogHeader> */}
          <SheetTitle className="text-center text-[24px] font-[700] text-brand-black">
            Apply filters
          </SheetTitle>
          {/* <DialogDescription> */}
          <div>
            <Formik
              initialValues={filterValues}
              validationSchema={JobFormSchema}
              onSubmit={handleFilterSubmit}
            >
              {({ setFieldValue, errors, touched, resetForm, values }) => (
                <Form>
                  <label className="customLabel w-full text-start">
                    Workplace
                  </label>
                  <div className="flex gap-4">
                    <div className="w-full">
                      <Select
                        onValueChange={(value) => {
                          setFieldValue("workPlaceType", value);
                          setFilterValues((prevState) => ({
                            ...prevState,
                            workPlaceType: value,
                          }));

                          if (value !== "onsite") {
                            setFieldValue("location", "");
                            setFilterValues((prevState) => ({
                              ...prevState,
                              location: "",
                            }));
                          }
                        }}
                        value={filterValues.workPlaceType}
                      >
                        <SelectTrigger className="mt-[4px] w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {[
                              { label: "Remote", value: "remote" },
                              { label: "Onsite", value: "onsite" },
                              { label: "Hybrid", value: "hybrid" },
                            ].map((type: any, index) => (
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

                    {values.workPlaceType === "onsite" && (
                      <div className="w-full">
                        <SearchWithDropdown
                          jobLocation={filterValues.location}
                          setJobLocation={(value: string) => {
                            setFilterValues((prev) => ({
                              ...prev,
                              location: value,
                            }));
                            setFieldValue("location", value);
                          }}
                         
                        />
                      </div>
                    )}
                  </div>
                  {/* <SearchWithDropdown
                    jobLocation={filterValues.location}
                    setJobLocation={(value: string) => {
                      setFilterValues((prev) => ({
                        ...prev,
                        location: value,
                      }));
                      setFieldValue("location", value);
                    }}
                  /> */}

                  <div className="my-[24px] flex w-full gap-4">
                    <div className="w-full">
                      <label className="customLabel w-full text-start">
                        Job type
                      </label>
                      <Select
                        // onValueChange={(value) =>
                        //   setFieldValue("jobType", value)
                        // }
                        onValueChange={(value) => {
                          setFieldValue("jobType", value);
                          setFilterValues((prevState) => ({
                            ...prevState,
                            jobType: value,
                          }));
                        }}
                        value={filterValues.jobType}
                      >
                        <SelectTrigger className="mt-[4px] w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {[
                              { label: "Full time", value: "full-time" },
                              { label: "Part time", value: "part-time" },
                              { label: "Internship", value: "internship" },
                              { label: "Contract", value: "contract" },
                              { label: "Seasonal", value: "seasonal" },
                            ].map((type: any, index) => (
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

                    <div className="w-[80%]">
                      <label className="customLabel">Date Posted</label>
                      <Select
                        // onValueChange={(value) =>
                        //   setFieldValue("datePosted", value)
                        // }
                        onValueChange={(value) => {
                          setFieldValue("datePosted", value);
                          setFilterValues((prevState) => ({
                            ...prevState,
                            datePosted: value,
                          }));
                        }}
                        value={filterValues.datePosted}
                      >
                        <SelectTrigger className="mt-[4px] w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {[
                              {
                                label: "Last 24 hours",
                                value: "last-24-hours",
                              },
                              { label: "Last 3 days", value: "last-3-days" },
                              { label: "Last 7 days", value: "last-7-days" },
                              { label: "Last 30 days", value: "last-30-days" },
                            ].map((type: any, index) => (
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
                  </div>

                  <label className="customLabel">Enter your expected salary</label>
                  <div className="relative">
                    <Field
                      name="salary"
                      // placeholder="$"
                      className="customInput pl-7"
                      onChange={(e: any) => {
                        setFieldValue("salary", e.target.value);
                        setFilterValues((prev) => ({
                          ...prev,
                          salary: e.target.value,
                        }));
                      }}
                      // onKeyPress={(event: any) => {
                      //   if (!/[0-9]/.test(event.key)) {
                      //     event.preventDefault();
                      //   }
                      // }}
                      onInput={(event: any) => {
                        const value = event.target.value;
                        event.target.value = value.replace(/[^0-9]/g, ''); 
                      }}
                    />
                    <span className="absolute left-4 top-5">$</span>
                  </div>
                  {errors.salary && touched.salary ? (
                    <div className="error text-[12px] text-red-500">
                      {errors.salary}
                    </div>
                  ) : null}
                  <SheetFooter className="flex w-full sm:justify-end">
                    <div className="mt-[40px] flex w-full justify-end gap-4">
                      {filtersApplied && (
                        <SheetClose
                          onClick={() =>
                            handleClearFilters(resetForm, setFieldValue)
                          }
                          asChild
                        >
                          <button
                            type="button"
                            className="w-[140px] rounded-[8px] border-[1px] border-[#7C7C7C] bg-white px-[20px] py-[10px] text-[16px] font-[600] text-label-gray"
                          >
                            Clear filters
                          </button>
                        </SheetClose>
                      )}
                      <SheetClose>
                        <button
                          // ref={clearFilterRef}
                          type="submit"
                          className="w-[140px] rounded-[8px] bg-primary px-[20px] py-[10px] text-[16px] font-[600] text-white"
                        >
                          Apply
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
    </>
  );
};

export default SearchSection;
