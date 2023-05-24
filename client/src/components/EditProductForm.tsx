import {
  Button,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../contexts/ProductContext";
import { Product } from "../data";
import { requiredText, schema } from "./AddProductForm";
import { orderButtonStyle } from "./CartCard";

export interface Category {
  _id: string;
  name: string;
}

export default function EditForm() {
  const navigate = useNavigate();
  const { productList, editProduct } = useProduct();

  const { id } = useParams<{ id: string }>();
  const productToEdit = productList.find((product) => product._id === id);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios
      .get("/api/products/category")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const formik = useFormik<Product>({
    initialValues: productToEdit
      ? {
          ...productToEdit,
        }
      : {
          _id: "",
          image: "",
          imageAlt: "",
          title: "",
          description: "",
          price: 0,
          bgColor: "",
          inStock: 0,
          categories: [],
        },
    validationSchema: schema,
    onSubmit: (values, actions) => {
      editProduct(values);
      actions.resetForm();
      navigate("/admin");
    },
  });

  useEffect(() => {
    if (productToEdit) {
      formik.setValues({
        ...productToEdit,
      });
    } else {
      formik.setValues({
        _id: "",
        image: "",
        imageAlt: "",
        title: "",
        description: "",
        price: 0,
        bgColor: "",
        inStock: 0,
        categories: [],
      });
    }
  }, [id]);

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
      <Button mt="1rem" sx={orderButtonStyle} type="submit">
        Edit Product
      </Button>
    </form>
  );
}
