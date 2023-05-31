import * as yup from "yup";

export const createOrderSchema = yup.object().shape({
  products: yup
    .array()
    .of(
      yup.object().shape({
        _id: yup.string().required("Product ID is required"),
        quantity: yup
          .number()
          .integer()
          .positive("Quantity must be a positive number")
          .required("Quantity is required"),
      })
    )
    .required("Products are required"),
  deliveryAddress: yup
    .object()
    .shape({
      firstName: yup.string().required("First name is required"),
      lastName: yup.string().required("Last name is required"),
      street: yup.string().required("Street is required"),
      zipCode: yup
        .number()
        .integer()
        .positive("Zip code must be a positive number")
        .required("Zip code is required"),
      city: yup.string().required("City is required"),
    })
    .required("Delivery address is required"),
});
