import { SearchWithDropdown } from "@/components/common/SearchWithDropdown";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { JobTypeArray } from "@/lib/constants/AddReviewForm";
import { EmployCount, Industries } from "@/lib/constants/createCompanyForm";
import { useCreateCompany } from "@/lib/hooks/query";
import { useIsLargeScreen } from "@/lib/hooks/screenSizeCheck";
import { Field, Form, Formik, FormikHelpers } from "formik";
import React, { forwardRef, useRef, useState } from "react";
import { useToast } from "../../ui/use-toast";
import spinner from "@/assets/svg/spinner.svg";
import Image from "next/image";
import { AddRatingForm1 } from "./AddRatingForm1";
import { useReviewContext } from "@/lib/context/ReviewContext";
import { CreateCompanyValidationSchema } from "@/lib/schema/CreateCompanyFormSchema";

export const CreateCompany = forwardRef<HTMLButtonElement>((props, ref) => {
  const { mutateAsync: createCompany, isPending } = useCreateCompany();
  const [createCompanyFormValues, setCreateCompanyFormValues] = useState({
    companyName: "",
    industry: "",
    employmentCount: "",
    location: "",
  });
  const { toast } = useToast();
  const { setRatingValues } = useReviewContext();
  const closeCreateCompanyRef = useRef(null);
  const openAddRatingCard1 = useRef(null);

  const handleOpenAddRatingCard1 = () => {
    // setRatingValues((prev: any) => ({ ...prev, company: params.companyId }));
    console.log("clicked");
    if (openAddRatingCard1.current) {
      (openAddRatingCard1.current as HTMLButtonElement).click();
    }
  };

  const handleCreateComapanyFormClose = () => {
    if (closeCreateCompanyRef.current) {
      (closeCreateCompanyRef.current as HTMLButtonElement).click();
    }
  };

  const handleCreateCompany = async (
    values: any,
    { resetForm }: FormikHelpers<any>,
  ) => {
    try {
      const response = await createCompany({ ...values });
      //  console.log(response?._id, "ID")
      setRatingValues((prev: any) => ({ ...prev, company: response?._id }));
      // toast({
      //   variant: "success",
      //   title: "Company created successfully",
      // });
      resetForm();
      setCreateCompanyFormValues({
        companyName: "",
        industry: "",
        employmentCount: "",
        location: "",
      });
      handleOpenAddRatingCard1();
      handleCreateComapanyFormClose();
    } catch (error) {
      console.error("Failed to create company");
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
          side={useIsLargeScreen() ? "center" : "bottom"}
          className="w-full bg-white lg:max-w-[551px]"
        >
          <div>
            <h1 className="text-[24px] font-[700] leading-[36px]">
              Create and rate the company
            </h1>
            <p className="mt-[4px] text-[16px] font-[400] leading-[24px] text-[#7C7C7C]">
              Enter the following details to post your experience
            </p>

            <div>
              <Formik
                initialValues={{
                  companyName: "",
                  industry: "",
                  employmentCount: "",
                  location: "",
                }}
                validationSchema={CreateCompanyValidationSchema}
                onSubmit={handleCreateCompany}
              >
                {({ setFieldValue, values, errors, touched, resetForm }) => (
                  <Form>
                    <div className=" ">
                      <div className="mt-[24px] flex w-full flex-col">
                        <div className="w-full mb-[8px]">
                          <label className="customLabel text-[14px]">
                            Company name
                          </label>
                          <Field name="companyName" className={`customInput`} />
                          {errors.companyName && touched.companyName && (
                            <div className="mt-1 text-sm text-red-500">
                              {errors.companyName}
                            </div>
                          )}
                        </div>

                        <div className="w-full">
                          <label className="customLabel w-full text-[14px]">
                            Industry
                          </label>
                          <Select
                            onValueChange={(value) => {
                              setFieldValue("industry", value);
                              setCreateCompanyFormValues((prevState: any) => ({
                                ...prevState,
                                industry: value,
                              }));
                            }}
                            value={createCompanyFormValues.industry}
                          >
                            <SelectTrigger className="mt-[4px] w-full">
                              <SelectValue
                                placeholder="Select"
                                className="text-[#7C7C7C]"
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {Industries?.map((type: any, index) => (
                                  <SelectItem
                                    value={type}
                                    key={index}
                                    className="cursor-pointer"
                                  >
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          {errors.industry && touched.industry && (
                            <div className="mt-1 text-sm text-red-500">
                              {errors.industry}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-[16px] flex w-full flex-col gap-4 md:flex-row">
                        <div className="w-full md:w-2/5">
                          <label className="customLabel text-[14px]">
                            No of employees
                          </label>
                          <Select
                            onValueChange={(value) => {
                              setFieldValue("employmentCount", value);
                              setCreateCompanyFormValues((prevState: any) => ({
                                ...prevState,
                                employmentCount: value,
                              }));
                            }}
                            value={createCompanyFormValues.employmentCount}
                          >
                            <SelectTrigger className="mt-[4px] w-full">
                              <SelectValue
                                placeholder="Select"
                                className="text-[#7C7C7C]"
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {EmployCount?.map((type: any, index) => (
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
                          {errors.employmentCount &&
                            touched.employmentCount && (
                              <div className="mt-1 text-sm text-red-500">
                                {errors.employmentCount}
                              </div>
                            )}
                        </div>

                        <div className="w-full">
                          <label className="customLabel text-[14px]">
                            Location
                          </label>
                          <div className="w-full">
                            <SearchWithDropdown
                              jobLocation={createCompanyFormValues.location}
                              setJobLocation={(value: string) => {
                                setCreateCompanyFormValues((prev) => ({
                                  ...prev,
                                  location: value,
                                }));
                                setFieldValue("location", value);
                              }}
                              select="city"
                            />
                            {errors.location && touched.location && (
                              <div className="mt-1 text-sm text-red-500">
                                {errors.location}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <SheetFooter className="flex w-full md:justify-end">
                      <div className="mt-[40px] flex w-full justify-end gap-4">
                        <SheetClose
                          ref={closeCreateCompanyRef}
                          onClick={() => {
                            handleCreateComapanyFormClose();
                            resetForm();
                            setCreateCompanyFormValues({
                              companyName: "",
                              industry: "",
                              employmentCount: "",
                              location: "",
                            });
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
                            "Next"
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
      <AddRatingForm1 ref={openAddRatingCard1} />
    </>
  );
});

CreateCompany.displayName = "CreateCompany";
