import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input, InputProps } from "@chakra-ui/input";
import { Field, FieldHookConfig, useField } from "formik";

type TextFieldProps = InputProps & FieldHookConfig<any> & { label?: string };

export const TextField = ({ label, ...props }: TextFieldProps) => {
  const [field, meta] = useField(props);
  return (
    <FormControl isInvalid={!!(meta.error && meta.touched)}>
      <FormLabel my=".5rem">{label}</FormLabel>
      <Field border="1px solid black" as={Input} {...field} {...props} />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};
