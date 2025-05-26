"use client";

import StarRating from "@/components/common/StarRating";
import { SheetClose } from "@/components/ui/NavSheet";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsLargeScreen } from "@/lib/hooks/screenSizeCheck";
import React, { forwardRef, useRef, useState } from "react";
import Image from "next/image";
import backicon from "@/assets/icons/backicon.svg";

import { Field, Form, Formik, FormikHelpers } from "formik";
import { useReviewContext } from "@/lib/context/ReviewContext";
import { SubmitRatingFormSchema } from "@/lib/schema/AddReviewSchema";
import { useSubmitRating } from "@/lib/hooks/query";
import { useToast } from "../../ui/use-toast";
import spinner from "@/assets/svg/spinner.svg";
import { AlertDialogDemo } from "./Alert";

type propsCard2 = {
  handleCard1Close1: () => void;
};
export const AddRatingForm2 = forwardRef<HTMLButtonElement, propsCard2>(
  ({ handleCard1Close1, ...props }, ref) => {
    const { toast } = useToast();
    const { ratingValues, setRatingValues } = useReviewContext();
    const { mutateAsync: submitRatingForm, isPending } = useSubmitRating();

    const closeCard2Ref = useRef(null);
    const openDialogRef = useRef(null);

    const handleCard2Close = () => {
      setRatingValues({});
      handleCard1Close1();
      // console.log("clicked");
      if (closeCard2Ref.current) {
        (closeCard2Ref.current as HTMLButtonElement).click();
      }
    };

    const handleRatingSubmit = async (
      values: any,
      { resetForm }: FormikHelpers<any>,
    ) => {
      try {
        await submitRatingForm({ ...ratingValues, ...values });
        handleOpenDialog();
        // toast({
        //   variant: "success",
        //   title: "Posted review successfully",
        //   description: "The review will be public after approval from admin",
        // });
        resetForm();
        setRatingValues({});
        handleCard2Close();
        handleCard1Close1();
        // console.log("Rating submitted successfully");
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Failed to post the review",
          // description: "",
        });
        console.error("Failed to submit rating", error);
      }
    };

    const handleOpenDialog = () => {
      // console.log("clicked");
      if (openDialogRef.current) {
        (openDialogRef.current as HTMLButtonElement).click();
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
            onInteractOutside={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            side={useIsLargeScreen() ? "center" : "bottom"}
            className=" w-full bg-white lg:max-w-[551px]"
          >
            <SheetTitle>
              <SheetClose className="mb-[30px] flex gap-[4px]">
                <Image src={backicon} alt="close icon" width={24} height={24} />
                <span className="text-[16px] font-[700] text-primary">
                  Go back
                </span>
              </SheetClose>
            </SheetTitle>

            <div>
              <h1 className="text-[24px] font-[700] leading-[36px]">
                Rate your experience
              </h1>

              <div>
                <Formik
                  initialValues={{
                    title: "",
                    description: "",
                    rating: 0,
                  }}
                  validationSchema={SubmitRatingFormSchema}
                  onSubmit={handleRatingSubmit}
                >
                  {({ setFieldValue, values, errors, touched, resetForm }) => (
                    <Form>
                      <div className="hide-scrollbar1 h-[48vh]  overflow-y-auto">
                        <div className="mt-[32px] w-full">
                          <label className="customLabel pb-[8px] text-[14px]">
                            Give rating
                          </label>
                          <StarRating
                            initialRating={values.rating}
                            onRatingChange={(rate) =>
                              setFieldValue("rating", rate)
                            }
                          />
                          {errors.rating && touched.rating && (
                            <div className="mt-1 text-sm text-red-500">
                              {errors.rating}
                            </div>
                          )}
                        </div>
                        <div className="mt-[18px] w-full">
                          <label className="customLabel text-[14px]">
                            Title
                          </label>
                          <Field name="title" className="customInput" />
                          {errors.title && touched.title && (
                            <div className="mt-1 text-sm text-red-500">
                              {errors.title}
                            </div>
                          )}
                        </div>

                        <div className="mt-[24px] w-full">
                          <label className="customLabel text-[14px]">
                            Description (Optional)
                          </label>
                          <Field
                            as="textarea"
                            name="description"
                            className="customInput h-[200px] resize-none"
                          />
                        </div>
                      </div>

                      <SheetFooter className="flex w-full md:justify-end">
                        <div className="mt-[20px] flex w-full justify-end gap-4 lg:mt-[40px]">
                          <SheetClose
                            ref={closeCard2Ref}
                            onClick={() => {
                              resetForm();
                              handleCard2Close();
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
                            {isPending ? (
                              <Image
                                src={spinner}
                                alt="spinner"
                                className="mx-auto w-6 animate-spin text-white"
                              />
                            ) : (
                              "Post"
                            )}
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
        <AlertDialogDemo ref={openDialogRef} />
      </>
    );
  },
);

AddRatingForm2.displayName = "AddRatingForm2";
