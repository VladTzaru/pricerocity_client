import { InputHTMLAttributes } from "react";
import { useField } from "formik";
import React from "react";
import { Form } from "semantic-ui-react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  size?: any; // Never gonna use size
};

const InputField: React.FC<InputFieldProps> = ({ width: _, ...props }) => {
  const [field, { error }] = useField(props);
  return (
    <Form.Input
      {...field}
      {...props}
      error={error && { content: error, pointing: "below" }}
      fluid
      label={props.label}
      placeholder={props.label}
      id={props.name}
    />
  );
};

export default InputField;
