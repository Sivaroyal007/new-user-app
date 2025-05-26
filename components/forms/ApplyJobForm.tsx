import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import FileUploader from "../common/FileUploader";
import { useSubmitJobApplication } from "@/lib/hooks/query";
import spinner from "@/assets/svg/spinner.svg";
import Image from "next/image";
import { useToast } from "../ui/use-toast";

type ApplyJobFormProps = {
  handleCloseApplyFormClick: () => void;
  jobId: string;
  handleCloseJobDetailsClick: () => void;
};
const ApplyJobForm: React.FC<ApplyJobFormProps> = ({
  handleCloseApplyFormClick,
  jobId,
  handleCloseJobDetailsClick,
}) => {
  const { toast } = useToast();
  const [fileData, setFileData] = useState<{
    fileName: string;
    storageName: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync: submitJobApplicationMutation, isPending } =
    useSubmitJobApplication();
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    description: "",
  };

  // console.log(jobId,"JOB ID")
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    // description: Yup.string().required("Description is required"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    if (!fileData || !fileData.fileName) {
      toast({
        variant: "destructive",
        title: "File not uploaded",
        description: "Please upload a file before submitting the form.",
      });
      return;
    }

    const formData = { ...values, resume: fileData };

    try {
      await submitJobApplicationMutation({ jobId, formData });
      toast({
        variant: "success",
        title: "Applied for job successfully",
        // description: "You have successfully created job post.",
      });
      // console.log('Form submitted successfully');
      handleCloseApplyFormClick();
      handleCloseJobDetailsClick();
      // console.log("Form data", formData);
    } catch (error) {
      console.error("Form submit failed", error);

      toast({
        variant: "destructive",
        title: "Failed to create a job post.",
      });
    }
    // Handle form submission logic here
  };

  return (
    <div className="relative">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ resetForm }) => (
          <Form className="w-full">
            <h1 className="mb-[34px] text-center text-[24px] font-[700] lg:text-start">
              Job application form
            </h1>
            <div className="hide-scrollbar1 h-[71vh] w-full overflow-y-auto">
              <div className="w-full">
                <label className="customLabel"> Upload your resume</label>
                <div className="customInput flex w-full justify-between">
                  <p className="line-clamp-1 w-full text-[16px] font-[300] text-[#7C7C7C]">
                    {isLoading
                      ? "uploading...."
                      : fileData?.fileName
                        ? fileData?.fileName
                        : ".doc, .pdf, .png, .jpeg."}
                   
                  </p>
                  <FileUploader
                    handleFileData={setFileData}
                    jobId={jobId}
                    fileType="resume"
                    setIsLoading={setIsLoading}
                    isLoading={isLoading}
                    // removeFile={handleRemoveFile}
                  />
                </div>
              </div>
              <div className="mt-[24px] flex w-full gap-4">
                <div className="w-full">
                  <label className="customLabel">First name</label>
                  <Field name="firstName" className="customInput" />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-[12px] text-red-500"
                  />
                </div>
                <div className="w-full">
                  <label className="customLabel">Last name</label>
                  <Field name="lastName" className="customInput" />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-[12px] text-red-500"
                  />
                </div>
              </div>

              <div className="my-[24px] w-full">
                <label className="customLabel">Email</label>
                <Field name="email" className="customInput" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-[12px] text-red-500"
                />
              </div>

              <div className="w-full pb-[4rem]">
                <label className="customLabel">Description (Optional)</label>
                <Field
                  as="textarea"
                  name="description"
                  className="customInput h-[178px]"
                />
                {/* <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-[12px]"
                /> */}
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 mt-[20px] flex w-full gap-[8px] bg-white pt-[20px] lg:justify-end">
              <button
                type="button"
                className="h-[44px] w-full rounded-[8px] px-[20px] py-[10px] text-[#7C7C7C] lg:max-w-[120px]"
                onClick={() => {
                  resetForm();
                  handleCloseApplyFormClick();
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="h-[44px] w-full rounded-[8px] bg-primary px-[20px] py-[10px] text-white lg:max-w-[120px]"
              >
                {isPending ? (
                  <Image
                    src={spinner}
                    alt="spinner"
                    className="mx-auto h-5 w-5 animate-spin text-white"
                  />
                ) : (
                  "Apply"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ApplyJobForm;
