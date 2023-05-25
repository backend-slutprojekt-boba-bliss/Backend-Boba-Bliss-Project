import * as yup from "yup";

export const CategorySchema = yup.object({
  name: yup.string().required("Image source is required"),
});
