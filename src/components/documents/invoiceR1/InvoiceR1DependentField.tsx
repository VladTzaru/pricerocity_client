import { useEffect } from "react";
import { useField, useFormikContext } from "formik";
import { addDays, format } from "date-fns";
import { DateFormat, InvoiceR1 } from "../../../types";
import { Form } from "semantic-ui-react";

type InvoiceR1DependentFieldProps = {
  name: string;
  label: string;
  disabled?: boolean;
};

const PAYMENT_DEAD_LINE_DATE = "paymentDeadlineDate";
const RECIPIENT = "recipient";

const InvoiceR1DependentField: React.FC<InvoiceR1DependentFieldProps> = ({
  disabled = false,
  ...props
}) => {
  const {
    values: { date, paymentDeadline, buyerName },
    touched,

    setFieldValue,
  } = useFormikContext<InvoiceR1>();
  const [field, { error }] = useField(props);

  useEffect(() => {
    if (props.name === PAYMENT_DEAD_LINE_DATE)
      setFieldValue(
        props.name,
        format(addDays(new Date(date), paymentDeadline), DateFormat.MM_DD_YYYY)
      );

    if (props.name === RECIPIENT) setFieldValue(props.name, buyerName);

    if (
      buyerName.trim() !== "" &&
      touched.buyerName &&
      props.name === RECIPIENT
    ) {
      setFieldValue(props.name, buyerName);
    }

    if (
      touched.date &&
      touched.paymentDeadline &&
      props.name === PAYMENT_DEAD_LINE_DATE
    ) {
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
    buyerName,
    touched.buyerName,
  ]);

  return (
    <>
      <Form.Input
        disabled={disabled}
        error={error && { content: error, pointing: "below" }}
        {...props}
        {...field}
      />
    </>
  );
};

export default InvoiceR1DependentField;
