import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  SystemStyleObject,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useProduct } from "../../src/ProductContext";
import { Product } from "../data";
import { orderButtonStyle } from "./CartCard";

type ProductValues = Record<keyof Product, Yup.AnySchema>;

export const schema = Yup.object<ProductValues>().shape({
  image: Yup.string().url("Invalid image URL!").required("Required"),

  imageAlt: Yup.string().max(20, "Must be 20 characters or less"),
  // .required("Required")
  title: Yup.string()
    .max(50, "Must be 50 characters or less")
    .required("Required"),

  description: Yup.string()
    .max(200, "Must be 200 characters or less")
    .required("Required"),

  price: Yup.number()
    .typeError("Must be a number")
    .positive("Price must be positive")
    .required("Required"),

  bgColor: Yup.string().oneOf(
    [
      "yellowCardCircle",
      "fruitTeaCircle",
      "bigMatchaCard",
      "#8fc2e9",
      "#bf96da",
    ],
    "Background color must be selected"
  ),

  quantity: Yup.number()
    .typeError("Must be a number")
    .positive("Quantity must be positive")
    .required("Required"),

  inStock: Yup.number()
    .typeError("Must be a number")
    .positive("In Stock must be positive")
    .required("Required"),

  category: Yup.string().oneOf(
    ["milk", "fruit"],
    "Category must be either 'milk' or 'fruit'"
  ),
  // .required("Required")
});

interface Props {
  product?: Product;
}

export function generateUniqueId(): string {
  const timestamp = new Date().getTime();
  const randomValue = Math.floor(Math.random() * 1000000);
  return `${timestamp}-${randomValue}`;
}

export function AdminForm() {
  const { addProduct } = useProduct();

  const navigate = useNavigate();

  const formik = useFormik<Product>({
    initialValues: {
      _id: "",
      image: "",
      imageAlt: "",
      title: "",
      description: "",
      price: 0,
      bgColor: "",
      quantity: 0,
      inStock: 0,
      category: "",
    },
    validationSchema: schema,
    onSubmit: (values, actions) => {
      const newProduct = { ...values, id: generateUniqueId() };
      addProduct(newProduct);
      actions.resetForm();
      navigate("/admin");
    },
  });

  return (
    <form data-cy="product-form" onSubmit={formik.handleSubmit}>
      <FormControl>
        <FormLabel>Image URL</FormLabel>
        <Input
          data-cy="product-image"
          id="image"
          name="image"
          type="text"
          placeholder="Image URL"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.image}
        />
        {formik.touched.image && formik.errors.image ? (
          <Text data-cy="product-image-error" sx={requiredText}>
            {formik.errors.image}
          </Text>
        ) : null}
      </FormControl>
      <FormControl>
        <FormLabel>Image Alt</FormLabel>
        <Input
          id="imageAlt"
          name="imageAlt"
          type="text"
          placeholder="Image Alt"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.imageAlt}
        />
        {formik.touched.imageAlt && formik.errors.imageAlt ? (
          <Text sx={requiredText}>{formik.errors.imageAlt}</Text>
        ) : null}
      </FormControl>
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input
          data-cy="product-title"
          id="title"
          name="title"
          type="text"
          placeholder="Image Alt"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />
        {formik.touched.title && formik.errors.title ? (
          <Text data-cy="product-title-error" sx={requiredText}>
            {formik.errors.title}
          </Text>
        ) : null}
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Input
          data-cy="product-description"
          id="description"
          name="description"
          type="text"
          placeholder="description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        {formik.touched.description && formik.errors.description ? (
          <Text data-cy="product-description-error" sx={requiredText}>
            {formik.errors.description}
          </Text>
        ) : null}
      </FormControl>
      <FormControl>
        <FormLabel>Price</FormLabel>
        <Input
          data-cy="product-price"
          id="price"
          name="price"
          type="text"
          placeholder="price"
          onChange={(e) =>
            formik.setFieldValue("price", Number(e.target.value))
          }
          onBlur={formik.handleBlur}
          value={formik.values.price}
        />
        {formik.touched.price && formik.errors.price ? (
          <Text data-cy="product-price-error" sx={requiredText}>
            {formik.errors.price}
          </Text>
        ) : null}
      </FormControl>
      <FormControl>
        <FormLabel>BackgroundColor</FormLabel>
        <Select
          id="bgColor"
          name="bgColor"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.bgColor}
          placeholder="Select a color"
        >
          <option value="yellowCardCircle">Yellow</option>
          <option value="fruitTeaCircle">Pink</option>
          <option value="bigMatchaCard">Green</option>
          <option value="#8fc2e9">Blue</option>
          <option value="#bf96da">Purple</option>
        </Select>
        {formik.touched.bgColor && formik.errors.bgColor ? (
          <Text sx={requiredText}>{formik.errors.bgColor}</Text>
        ) : null}
      </FormControl>
      <FormControl>
        <FormLabel>Quantity</FormLabel>
        <Input
          data-cy="product-quantity"
          id="quantity"
          name="quantity"
          type="text"
          placeholder="quantity"
          onChange={(e) =>
            formik.setFieldValue("quantity", Number(e.target.value))
          }
          onBlur={formik.handleBlur}
          value={formik.values.quantity}
        />
        {formik.touched.quantity && formik.errors.quantity ? (
          <Text data-cy="product-quantity-error" sx={requiredText}>
            {formik.errors.quantity}
          </Text>
        ) : null}
      </FormControl>

      <FormControl>
        <FormLabel>In Stock</FormLabel>
        <Input
          data-cy="product-inStock"
          id="inStock"
          name="inStock"
          type="text"
          placeholder="inStock"
          onChange={(e) =>
            formik.setFieldValue("inStock", Number(e.target.value))
          }
          onBlur={formik.handleBlur}
          value={formik.values.inStock}
        />
        {formik.touched.inStock && formik.errors.inStock ? (
          <Text data-cy="product-inStock-error" sx={requiredText}>
            {formik.errors.inStock}
          </Text>
        ) : null}
      </FormControl>
      <FormControl pb="1rem">
        <FormLabel>Category</FormLabel>
        <Select
          id="category"
          name="category"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.category}
          placeholder="Select a category"
        >
          <option value="milk">Milk</option>
          <option value="fruit">Fruit</option>
        </Select>
        {formik.touched.category && formik.errors.category ? (
          <Text sx={requiredText}>{formik.errors.category}</Text>
        ) : null}
      </FormControl>
      <Button sx={orderButtonStyle} type="submit">
        Add Product
      </Button>
    </form>
  );
}

export const requiredText: SystemStyleObject = {
  color: "red",
};
