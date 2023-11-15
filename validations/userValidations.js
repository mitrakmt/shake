import yup from 'yup';

const schemas = {
  profileSchema: yup.object({
    access: yup.object({
      userId: yup.string().required(),
    }),
    name: yup.string(),
    bio: yup.string(),
    country: yup.string(),
    city: yup.string(),
    username: yup.string(),
    gender: yup.string(),
  }),
};

export default schemas;
