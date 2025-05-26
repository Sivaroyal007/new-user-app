import * as Yup from "yup";

const baseRatingValidationSchema = Yup.object().shape({
  jobTitle: Yup.string().required("Job Title is required"),
  // jobType: Yup.string().required("Job Type is required"),
  applicationDate: Yup.date()
    .nullable()
    .required("Application Date is required"),
    noOfInterviews: Yup.number()
    .typeError("Number of Interviews must be a number")
    .required("Number of Interviews is required")
    .min(0, "Number of Interviews is required"),
  noOfDays: Yup.number()
    .typeError("Number of Days must be a number")
    .required("Number of Days is required")
    .min(0, "Number of Days is required"),
  hiringPlatform: Yup.string().required("Hiring Platform is required"),
});

const conditionalRatingSchema = Yup.object().shape({
  otherHiringPlatform: Yup.string().required(
    "Enter the name of the hiring channel",
  ),
});

export const RatingValidationSchema = Yup.lazy((values) => {
  const schema =
    values.hiringPlatform === "others"
      ? baseRatingValidationSchema.concat(conditionalRatingSchema)
      : baseRatingValidationSchema;

  return schema;
});

export const SubmitRatingFormSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  rating: Yup.number()
    .required("Rating is required")
    .min(1, "Rating is required")
    .max(5, "Rating must be at most 5"),
});
