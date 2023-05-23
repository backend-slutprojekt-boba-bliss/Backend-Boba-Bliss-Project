import * as yup from "yup";

export const ProductSchema = yup.object({
  image: yup.string().required("Image source is required"),
  imageAlt: yup.string().required(),
  title: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  bgColor: yup.string().required(),
  quantity: yup.number(),
  inStock: yup.number().required(),
  categories: yup.array().required(),
});

export const editProductSchema = yup.object({
  _id: yup.string().required().strict(),
  image: yup.string().required(),
  imageAlt: yup.string().required(),
  title: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  bgColor: yup.string().required(),
  quantity: yup.number(),
  inStock: yup.number().required(),
  categories: yup.array().required(),
  __v: yup.number().required(),
});
