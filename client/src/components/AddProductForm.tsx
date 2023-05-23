import {
  Button,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  SystemStyleObject,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useProduct } from "../contexts/ProductContext";
import { Product } from "../data";
import { orderButtonStyle } from "./CartCard";

type ProductValues = Record<keyof Product, Yup.AnySchema>;

export const schema = Yup.object<ProductValues>().shape({
  image: Yup.string().url("Invalid image URL!").required("Required"),
  imageAlt: Yup.string().max(20, "Must be 20 characters or less"),
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
  bgColor: Yup.string()
    .oneOf(
      [
        "yellowCardCircle",
        "fruitTeaCircle",
        "bigMatchaCard",
        "#8fc2e9",
        "#bf96da",
      ],
      "Background color must be selected"
    )
    .required("Required"),

  inStock: Yup.number()
    .typeError("Must be a number")
    .positive("In Stock must be positive")
    .required("Required"),
  categories: Yup.array()
    .of(Yup.string())
    .min(1, "At least one category is required")
    .required("Required"),
});

interface Props {
  product?: Product;
}
export interface addProduct {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  price: number;
  bgColor: string;
  inStock?: number;
  categories: string[];
}

export interface Category {
  _id: string;
  name: string;
}

export function AdminForm() {
  const { addProduct } = useProduct();

  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios
      .get("/api/products/category")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const formik = useFormik<addProduct>({
    initialValues: {
      image:
        "https://assets.icanet.se/e_sharpen:80,q_auto,dpr_1.25,w_718,h_718,c_lfill/imagevaultfiles/id_241061/cf_259/boba_tea.jpg",
      imageAlt: "mm",
      title: "TEST BOBA",
      description: "Tasty",
      price: 10,
      bgColor: "#bf96da",
      inStock: 20,
      categories: [],
    },
    validationSchema: schema,
    onSubmit: (values, actions) => {
      // if (!categoriesRef.current.includes(values.category)) {
      //   formik.setErrors({
      //     category: `Category must be one of ${categoriesRef.current.join(
      //       ", "
      //     )}`,
      //   });
      //   return;
      // }

      const newProduct = { ...values };
      addProduct(newProduct);
      actions.resetForm();
      navigate("/admin");
    },
  });

  const handleCategoryChange = (selectedCategories: string[]) => {
    formik.setFieldValue("category", selectedCategories);
  };

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
        <CheckboxGroup
          colorScheme="green"
          value={formik.values.categories}
          onChange={(values) => {
            console.log(values);
            formik.setFieldValue("categories", values);
            formik.setFieldTouched("categories", true);
          }}
        >
          <Stack spacing={5} direction="row">
            {categories.map((category) => (
              <Checkbox
                name="categories"
                key={category._id}
                value={category._id}
              >
                {category.name}
              </Checkbox>
            ))}
          </Stack>
        </CheckboxGroup>

        {formik.touched.categories && formik.errors.categories ? (
          <Text sx={requiredText}>{formik.errors.categories}</Text>
        ) : null}
      </FormControl>
      <Button sx={orderButtonStyle} type="submit">
        Add Product
      </Button>
    </form>
  );
}

{
  /* <Select
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
       ) : null} */
}

export const requiredText: SystemStyleObject = {
  color: "red",
};
