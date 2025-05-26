"use client";

import StarRating from "@/components/common/StarRating";
import { SheetClose } from "@/components/ui/NavSheet";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsLargeScreen } from "@/lib/hooks/screenSizeCheck";
import React, { forwardRef, useRef, useState } from "react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, Form, Formik } from "formik";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { AddRatingForm2 } from "./AddRatingForm2";
import { useReviewContext } from "@/lib/context/ReviewContext";
import { RatingValidationSchema } from "@/lib/schema/AddReviewSchema";
import {
  HiringChannelsArray,
  JobTypeArray,
} from "@/lib/constants/AddReviewForm";

export const AddRatingForm1 = forwardRef<HTMLButtonElement>((props, ref) => {
  const openAddRatingCard2 = useRef(null);
  const closeCardRef = useRef(null);
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const { ratingValues, setRatingValues } = useReviewContext();

  const handleRateForwardSubmit = (values: any) => {
    // console.log(values);
    if (values.applicationDate instanceof Date) {
      values.applicationDate = values.applicationDate
        .toISOString()
        .substr(0, 10);
    }
    setRatingValues((prev: any) => ({
      ...prev,
      ...values,
    }));
    handleOpenAddRatingCard1();
  };
  // console.log(ratingValues,"RATING VALUES")
  const handleOpenAddRatingCard1 = () => {
    // console.log("clicked");
    if (openAddRatingCard2.current) {
      (openAddRatingCard2.current as HTMLButtonElement).click();
    }
  };

  const handleCard1Close1 = () => {
    // console.log("clicked");
    if (closeCardRef.current) {
      (closeCardRef.current as HTMLButtonElement).click();
    }
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <button ref={ref} {...props} className="hidden">
            open card 1
          </button>
        </SheetTrigger>
        <SheetContent
          // onInteractOutside={(e) => {
          //   setRatingValues({});
          // }}
          side={useIsLargeScreen() ? "center" : "bottom"}
          className="w-full bg-white lg:max-w-[551px]"
        >
          <div>
            <h1 className="text-[24px] font-[700] leading-[36px]">
              Details about your hiring experience
            </h1>

            <div>
              <Formik
                initialValues={{
                  jobTitle: "",
                  // jobType: "",
                  applicationDate: "" || undefined,
                  noOfInterviews: "",
                  noOfDays: "",
                  hiringPlatform: "",
                  otherHiringPlatform: "",
                }}
                validationSchema={RatingValidationSchema}
                onSubmit={handleRateForwardSubmit}
              >
                {({ setFieldValue, values, errors, touched, resetForm }) => (
                  <Form>
                    <div className="hide-scrollbar1 max-h-[55vh] overflow-y-auto ">
                      <div className="mt-[24px] flex w-full flex-col gap-4 md:flex-row">
                        <div className="w-full">
                          <label className="customLabel text-[14px]">
                            Specify the job title you applied for.
                          </label>
                          <Field name="jobTitle" className={`customInput`} />
                          {errors.jobTitle && touched.jobTitle && (
                            <div className="mt-1 text-sm text-red-500">
                              {errors.jobTitle}
                            </div>
                          )}
                        </div>

                        {/* <div className="w-full">
                          <label className="customLabel w-full text-[14px]">
                            Job type
                          </label>
                          <Select
                            onValueChange={(value) => {
                              setFieldValue("jobType", value);
                              // setRatingValues((prevState: any) => ({
                              //   ...prevState,
                              //   jobType: value,
                              // }));
                            }}
                            value={values.jobType}
                          >
                            <SelectTrigger className="mt-[4px] w-full">
                              <SelectValue
                                placeholder="Select"
                                className="text-[#7C7C7C]"
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {JobTypeArray?.map((type: any, index) => (
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
                          {errors.jobType && touched.jobType && (
                            <div className="mt-1 text-sm text-red-500">
                              {errors.jobType}
                            </div>
                          )}
                        </div> */}
                      </div>

                      <div className="mt-[16px] flex w-full flex-col gap-4 md:flex-row">
                        <div className="mb-[4px] w-full">
                          <label className="customLabel text-[14px]">
                            When did you apply for this position?
                          </label>
                          <Popover
                            open={isPopoverOpen}
                            onOpenChange={() => setPopoverOpen(true)}
                          >
                            <PopoverTrigger asChild>
                              <div
                                className={
                                  "customInput flex h-[56px] cursor-pointer gap-[24px] rounded-[8px] text-left font-normal"
                                }
                              >
                                <CalendarIcon className="h-4 w-4 opacity-50" />
                                <span className="text-[#0D0D0A]">
                                  {values.applicationDate
                                    ? format(
                                        new Date(values.applicationDate),
                                        "PPP",
                                      )
                                    : "---- / ---- / -- -- -- --"}
                                </span>
                              </div>
                            </PopoverTrigger>
                            <PopoverContent 
                            onInteractOutside={() => setPopoverOpen(false)}
                            className="p-0" align="start">
                              <Calendar
                                mode="single"
                                toDate={new Date()}
                                selected={values.applicationDate}
                                onSelect={(date) => {
                                  setFieldValue("applicationDate", date);
                                  setPopoverOpen(false);
                                  // console.log("test");
                                }}
                                initialFocus={
                                  values.applicationDate || undefined
                                }
                                defaultMonth={values.applicationDate}
                                className="rounded-md border"
                              />
                            </PopoverContent>
                          </Popover>
                          {errors.applicationDate &&
                            touched.applicationDate && (
                              <div className="mt-1 text-sm text-red-500">
                                {errors.applicationDate}
                              </div>
                            )}
                        </div>
                        <div className="w-full">
                          <label className="customLabel text-[14px]">
                            Number of Interviews faced
                          </label>
                          <Field
                            onKeyDown={(e: any) => {
                              // Allow only numbers, Backspace, Delete, Tab, and Arrow keys
                              if (
                                !/^[0-9]$/.test(e.key) &&
                                ![
                                  "Backspace",
                                  "Delete",
                                  "Tab",
                                  "ArrowLeft",
                                  "ArrowRight",
                                ].includes(e.key)
                              ) {
                                e.preventDefault();
                              }
                            }}
                            name="noOfInterviews"
                            className="customInput"
                          />
                          {errors.noOfInterviews && touched.noOfInterviews && (
                            <div className="mt-1 text-sm text-red-500">
                              {errors.noOfInterviews}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-[12px] w-full">
                        <label className="customLabel text-[14px]">
                          How long did the entire process take? (In days)
                        </label>
                        <Field
                          name="noOfDays"
                          className="customInput"
                          onKeyDown={(e: any) => {
                            // Allow only numbers, Backspace, Delete, Tab, and Arrow keys
                            if (
                              !/^[0-9]$/.test(e.key) &&
                              ![
                                "Backspace",
                                "Delete",
                                "Tab",
                                "ArrowLeft",
                                "ArrowRight",
                              ].includes(e.key)
                            ) {
                              e.preventDefault();
                            }
                          }}
                        />
                        {errors.noOfDays && touched.noOfDays && (
                          <div className="mt-1 text-sm text-red-500">
                            {errors.noOfDays}
                          </div>
                        )}
                      </div>

                      <div className="mt-[16px] flex w-full gap-4">
                        <div className="w-full">
                          <label className="customLabel text-[14px]">
                            Where did you apply from?
                          </label>
                          <Select
                            onValueChange={(value) => {
                              setFieldValue("hiringPlatform", value);
                              // setRatingValues((prevState: any) => ({
                              //   ...prevState,
                              //   hiringPlatform: value,
                              // }));
                            }}
                            value={values.hiringPlatform}
                          >
                            <SelectTrigger className="mt-[4px] w-full">
                              <SelectValue
                                placeholder="Select"
                                className="text-[#7C7C7C]"
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {HiringChannelsArray?.map(
                                  (type: any, index) => (
                                    <SelectItem
                                      value={type.value}
                                      key={index}
                                      className="cursor-pointer"
                                    >
                                      {type.label}
                                    </SelectItem>
                                  ),
                                )}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          {errors.hiringPlatform && touched.hiringPlatform && (
                            <div className="mt-1 text-sm text-red-500">
                              {errors.hiringPlatform}
                            </div>
                          )}
                          {values.hiringPlatform === "others" && (
                            <div className="mt-[8px]">
                              <Field
                                placeholder="Enter name of the hiring channel"
                                name="otherHiringPlatform"
                                className="customInput placeholder-text-[14px]"
                              />
                              {errors.otherHiringPlatform &&
                                touched.otherHiringPlatform && (
                                  <div className="mt-1 text-sm text-red-500">
                                    {errors.otherHiringPlatform}
                                  </div>
                                )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <SheetFooter className="flex w-full md:justify-end">
                      <div className="mt-[40px] flex w-full justify-end gap-4">
                        <SheetClose
                          ref={closeCardRef}
                          onClick={() => {
                            // handleForm1Close();
                            setPopoverOpen(false);
                            resetForm();
                            setRatingValues({});
                          }}
                          asChild
                        >
                          <button
                            type="button"
                            className="w-full rounded-[8px] border-[1px] border-[#7C7C7C] bg-white px-[20px] py-[10px] text-[16px] font-[600] text-label-gray md:w-[140px]"
                          >
                            Cancel
                          </button>
                        </SheetClose>
                        <button
                          type="submit"
                          className="w-full rounded-[8px] bg-primary px-[20px] py-[10px] text-[16px] font-[600] text-white md:w-[140px]"
                        >
                          Rate
                        </button>
                      </div>
                    </SheetFooter>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <AddRatingForm2
        ref={openAddRatingCard2}
        handleCard1Close1={handleCard1Close1}
      />
    </>
  );
});

AddRatingForm1.displayName = "AddRatingForm1";
