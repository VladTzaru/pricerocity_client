import { useField, useFormikContext } from "formik";
import React from "react";
import { FormField, Label } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateInputProps {
  label: string;
  [x: string]: any;
  name: string;
}

const DateInput: React.FC<DateInputProps> = ({ label, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);
  return (
    <FormField>
      <label>{label}</label>
      <DatePicker
        selected={(field.value && new Date(field.value)) || null}
        {...field}
        {...props}
        onChange={(value) => setFieldValue(field.name, value)}
      />
      {meta.touched && meta.error ? (
        <Label basic color='red'>
          {meta.error}
        </Label>
      ) : null}
    </FormField>
  );
};

export default DateInput;
