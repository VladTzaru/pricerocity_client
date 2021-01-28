import { useField } from "formik";
import React from "react";
import { DropdownItemProps, FormField, Label, Select } from "semantic-ui-react";

interface SelectInputProps {
  label: string;
  options: DropdownItemProps[];
  [x: string]: any;
  name: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  options,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  return (
    <FormField>
      <label>{label}</label>
      <Select
        options={options}
        clearable
        value={field.value || null}
        onChange={(_, d) => helpers.setValue(d.value)}
        onBlur={() => helpers.setTouched(true)}
        {...props}
      />
      {meta.touched && meta.error ? (
        <Label basic color='red'>
          {meta.error}
        </Label>
      ) : null}
    </FormField>
  );
};

export default SelectInput;
