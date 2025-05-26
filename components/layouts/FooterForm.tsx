"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useToast } from "../ui/use-toast";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  message: Yup.string().required("Message is required"),
});

const FooterForm = () => {
  const { toast } = useToast();
  const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;

  return (
    <div className="w-full">
      <Formik
        initialValues={{ name: "", email: "", message: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          // console.log("Form data", values);
          if (scriptUrl) {
            fetch(scriptUrl, {
              method: "POST",
              mode: "no-cors",
              body: JSON.stringify(values),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => {
                if (response.ok || response.type === "opaque") {
                  console.log("Form submitted successfully");
                  toast({
                    variant: "success",
                    title: "Message send successfully",
                  });
                  resetForm();
                  setSubmitting(false);
                } else {
                  throw new Error("Form submission failed");
                  setSubmitting(false);
                }
              })
              .catch((error) => console.error("Error:", error))
              .finally(() => {
                setSubmitting(false);
              });
          } else {
            console.error("Script URL is undefined");
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="flex w-full flex-col gap-[12px] text-white md:flex-row md:gap-[26px]">
              <div className="w-full">
                <Field
                  placeholder="Name"
                  type="text"
                  name="name"
                  className="footerInput"
                />
                <ErrorMessage name="name" component="div" className="text-sm text-red-400" />
              </div>
              <div className="w-full">
                <Field
                  placeholder="Email"
                  type="email"
                  name="email"
                  className="footerInput"
                />
                <ErrorMessage name="email" component="div" className="text-sm text-red-400" />
              </div>
            </div>
            <div>
              <Field
                as="textarea"
                name="message"
                placeholder="Message"
                className="footerInput mt-[16px] h-[212px] w-full resize-none text-white md:mt-[36px]"
              />
              <ErrorMessage name="message" component="div" className="text-sm text-red-400" />
            </div>
            <div className="mt-[16px] md:mt-[37px]">
              <button
                className="rounded-[8px] bg-[#FAFAFA] px-[20px] py-[10px] font-[600] text-primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Send Message"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FooterForm;
