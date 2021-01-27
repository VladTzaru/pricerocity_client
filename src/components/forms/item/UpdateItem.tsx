import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import InputField from "../../InputField";
import { Button, FormGroup, Header } from "semantic-ui-react";
import * as Yup from "yup";
import { LOADING } from "../../../constants";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Item, ItemValues } from "../../../types";

const initialValues: ItemValues = {
  itemNameCro: "",
  itemNameEng: "",
  retailPrice: 0,
  vat: 0,
};

const validationSchema = Yup.object().shape({
  itemNameCro: Yup.string().required("Naziv proizvoda (HRV) je obavezno uneti"),
  itemNameEng: Yup.string().required("Naziv proizvoda (ENG) je obavezno uneti"),
  retailPrice: Yup.number().required("MPC je obavezno uneti"),
  vat: Yup.number().required("PDV je obavezno uneti"),
});

interface UpdateItemProps {
  id: string;
}

const UpdateItem: React.FC<UpdateItemProps> = ({ id }) => {
  const history = useHistory();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(false);

  const updateItem = async (item: ItemValues) => {
    console.log(`${item} ${id} updated`);
  };

  const renderContent = () => {
    if (!item || loading) return <h4>{LOADING}</h4>;

    return (
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          updateItem(values);
          actions.resetForm();
        }}
      >
        {({ dirty, isValid, isSubmitting }) => (
          <Form className='ui form'>
            <Header as='h2'>Ažuriraj stavku: {item[0].itemNameCro} </Header>

            <FormGroup widths={2}>
              <InputField
                disabled={isSubmitting}
                name='itemNameCro'
                label='Naziv proizvoda (HRV)'
              />
              <InputField
                disabled={isSubmitting}
                name='itemNameEng'
                label='Naziv Proizvoda (ENG)'
              />
            </FormGroup>

            <FormGroup widths={2}>
              <InputField
                disabled={isSubmitting}
                type='number'
                name='retailPrice'
                label='MPC'
              />
              <InputField
                disabled={isSubmitting}
                type='number'
                name='vat'
                label='PDV'
              />
            </FormGroup>

            <Button
              type='button'
              onClick={() => history.push("/item")}
              basic
              size='large'
            >
              Natrag na stavke
            </Button>

            <Button
              loading={isSubmitting}
              primary
              size='large'
              disabled={isSubmitting || !dirty || !isValid}
              type='submit'
            >
              {isSubmitting ? LOADING : "Ažuriraj"}
            </Button>
          </Form>
        )}
      </Formik>
    );
  };

  useEffect(() => {
    const getItem = async () => {
      setLoading(true);
      const { data } = await axios.get<Item>(
        `${process.env.REACT_APP_API}/item/${id}`
      );
      setLoading(false);
      setItem(data);
    };
    getItem();
  }, [id]);

  return renderContent();
};

export default UpdateItem;
