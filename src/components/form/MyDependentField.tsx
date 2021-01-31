import { useEffect } from "react";
import { useField, useFormikContext } from "formik";
import { addDays, format } from "date-fns";
import { DateFormat } from "../../types";

type MyDependentFieldProps = {
  name: string;
  label: string;
};

const MyDependentField: React.FC<MyDependentFieldProps> = ({ ...props }) => {
  const {
    values: { date, paymentDeadline },
    touched,

    setFieldValue,
  } = useFormikContext<any>();
  const [field, meta] = useField(props);

  useEffect(() => {
    setFieldValue(
      props.name,
      format(addDays(new Date(date), paymentDeadline), DateFormat.MM_DD_YYYY)
    );

    if (touched.date && touched.paymentDeadline) {
      setFieldValue(
        props.name,
        format(addDays(new Date(date), paymentDeadline), DateFormat.MM_DD_YYYY)
      );
    }
  }, [
    date,
    paymentDeadline,
    touched.date,
    touched.paymentDeadline,
    setFieldValue,
    props.name,
  ]);

  return (
    <>
      <input {...props} {...field} />
      {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
    </>
  );
};

export default MyDependentField;
