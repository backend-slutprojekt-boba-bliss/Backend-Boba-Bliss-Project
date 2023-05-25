import * as yup from "yup";

export const FileSchema = yup.object({
  id: yup.string().required("Image source is required"),
});
