import { Button } from "@chakra-ui/button";
import { Heading } from "@chakra-ui/layout";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../contexts/orderContext";
import { requiredText } from "./AddProductForm";

const phoneRegExp = /^[0-9]{10}$/;

const customerSchema = Yup.object({
  firstName: Yup.string()
    .required("First name required")
    .min(2, "First name is too short"),
  lastName: Yup.string()
  .required("Last name required")
  .min(2, "Last name is too short"),
  street: Yup.string()
    .required("Street required")
    .min(2, "Street is too short"),
  city: Yup.string().required("City required").min(2, "City is too short"),
  zipCode: Yup.string()
    .required("Zip code is required")
    .matches(/^[0-9]{5}(?:-[0-9]{4})?$/, "Invalid zip code"),
  
});

export type Customer = Yup.InferType<typeof customerSchema>;

export function CheckoutForm() {
  const navigate = useNavigate();

  const { createOrder } = useOrder();

  const handleSubmit = async (
    values: Customer,
    actions: FormikHelpers<Customer>
  ) => {
    try {
      await customerSchema.validate(values);
      const customer = {
        firstName: values.firstName,
        lastName: values.lastName,
        street: values.street,
        zipCode: values.zipCode,
        city: values.city,
       
      };
      const order = createOrder(customer);
      actions.resetForm();
      navigate("/confirmation");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        street: "",
        zipCode: "",
        city: "",

      }}
      validationSchema={customerSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <form data-cy="customer-form" onSubmit={formik.handleSubmit}>
          <Flex sx={formStyle}>
            <Stack spacing={8} paddingTop="2rem">
              <Stack align={"center"}>
                <Heading fontSize={"4xl"} textAlign={"center"}>
                  Contact Details
                </Heading>
              </Stack>
              <Box sx={formBoxStyle}>
                <Stack spacing={4}>
                  <FormControl>
                    <FormLabel my=".5rem">firstName</FormLabel>
                    <Input
                      border="1px solid black"
                      data-cy="customer-firstName"
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="firstName"
                      autoComplete="firstName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.firstName}
                    ></Input>
                    {formik.touched.firstName && formik.errors.firstName ? (
                      <Text data-cy="customer-firstName-error" sx={requiredText}>
                        {formik.errors.firstName}
                      </Text>
                    ) : null}
                  </FormControl>
                  <FormControl>
                    <FormLabel my=".5rem">lastName</FormLabel>
                    <Input
                      border="1px solid black"
                      data-cy="customer-lastName"
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="lastName"
                      autoComplete="lastName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.lastName}
                    ></Input>
                    {formik.touched.lastName && formik.errors.lastName ? (
                      <Text data-cy="customer-lastName-error" sx={requiredText}>
                        {formik.errors.lastName}
                      </Text>
                    ) : null}
                  </FormControl>
                  <FormControl
                    isInvalid={
                      !!(formik.touched.street && formik.errors.street)
                    }
                  >
                    <FormLabel my=".5rem">Street</FormLabel>
                    <Input
                      border="1px solid black"
                      data-cy="customer-address"
                      id="street"
                      name="street"
                      type="text"
                      placeholder="Street"
                      autoComplete="street-address"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.street}
                    ></Input>
                    {formik.touched.street && formik.errors.street ? (
                      <Text data-cy="customer-address-error" sx={requiredText}>
                        {formik.errors.street}
                      </Text>
                    ) : null}
                  </FormControl>

                  <FormControl
                    isInvalid={
                      !!(formik.touched.zipCode && formik.errors.zipCode)
                    }
                  >
                    <FormLabel my=".5rem">Zip Code</FormLabel>
                    <Input
                      border="1px solid black"
                      data-cy="customer-zipcode"
                      id="zipCode"
                      name="zipCode"
                      type="text"
                      placeholder="Zip Code"
                      autoComplete="postal-code"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.zipCode}
                    ></Input>
                    {formik.touched.zipCode && formik.errors.zipCode ? (
                      <Text data-cy="customer-zipcode-error" sx={requiredText}>
                        {formik.errors.zipCode}
                      </Text>
                    ) : null}
                  </FormControl>

                  <FormControl
                    isInvalid={!!(formik.touched.city && formik.errors.city)}
                  >
                    <FormLabel my=".5rem">City</FormLabel>
                    <Input
                      border="1px solid black"
                      data-cy="customer-city"
                      id="city"
                      name="city"
                      type="text"
                      placeholder="city"
                      autoComplete="address-level2"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.city}
                    ></Input>
                    {formik.touched.city && formik.errors.city ? (
                      <Text data-cy="customer-city-error" sx={requiredText}>
                        {formik.errors.city}
                      </Text>
                    ) : null}
                  </FormControl>

                  <Stack spacing={10} pt={2} pb="1rem">
                    <Button
                      loadingText="Submitting"
                      sx={submitButtonStyle}
                      type="submit"
                      variant="outline"
                      colorScheme="teal"
                    >
                      Place Order
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Flex>
        </form>
      )}
    </Formik>
  );
}

const formStyle = {
  mx: "auto",
  as: "form",
  bg: "white",
  marginTop: "1rem",
  border: "2px solid rgb(0,0,0, 0.2)",
  borderRadius: "0.625rem",
  flexDirection: "column",
  align: "center",
  justify: "center",
};

const formBoxStyle = {
  rounded: "lg",
  boxShadow: "lg",
  p: "0.5rem",
  paddingTop: "0",
};

const submitButtonStyle = {
  width: "14rem",
  height: "4rem",
  mx: "auto",
  bg: "lightGreenButton",
  color: "black",
  border: "none",
};

// Ska vara ett formulär där användaren fyller i
// namn,
// mail,
// telefonnummer och
// adress.
// Fälten i formuläret ska gå att automatisk fyllas i.
// Samtliga fält ska valideras så att endast rätt information kan matas in.

// När alla delar har fyllts i på kassasidan så ska användaren kunna slutföra köpet
//och då få en bekräftelse på köpet tillsammans med ett unikt ordernummer.

// Tänk på att det inte ska gå att placera ordern två gånger,
// även om man navigerar tillbaka på sidan!
// orderinformationen som har matats in skall presenteras i beskräftelsen
// som ett bevis på att ni har hanterat datan i alla formulären korrekt.
