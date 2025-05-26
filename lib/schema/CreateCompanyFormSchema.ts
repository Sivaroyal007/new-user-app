import * as Yup from 'yup';

export const CreateCompanyValidationSchema = Yup.object().shape({
    companyName: Yup.string().required('Company name is required'),
    // industry: Yup.string().required('Industry is required'),
    // employmentCount: Yup.string().required('Employee count is required'),
    // location: Yup.string().required('Location is required'),
  });