import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import InputField from "../../form/InputField";
import { Button, FormGroup, Header, Icon } from "semantic-ui-react";
import { LOADING } from "../../../constants";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Item, ItemValues } from "../../../types";
import { itemValidationSchema } from "../../../validation/formValidationSchemas";

const initialValues: ItemValues = {
  itemNameCro: "",
  itemNameEng: "",
  retailPrice: 0,
  vat: 0,
};

interface UpdateItemProps {
  id: string;
}

const UpdateItem: React.FC<UpdateItemProps> = ({ id }) => {
  const history = useHistory();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(false);

  const updateItem = async (item: ItemValues) => {
    try {
      await axios.put(`${process.env.REACT_APP_API}/item/${id}`, item, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      history.push("/item");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API}/item/${id}`);
      history.push("/item");
    } catch (error) {
      console.log(error);
    }
  };

  const renderContent = () => {
    if (!item || loading) return <h4>{LOADING}</h4>;

    return (
      <Formik
        enableReinitialize
        validationSchema={itemValidationSchema}
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          updateItem(values);
          actions.resetForm();
        }}
      >
        {({ dirty, isValid, isSubmitting }) => (
          <Form className='ui form'>
            <Header as='h2'>Ažuriraj stavku: {item.itemNameCro} </Header>

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

            <Button type='button' onClick={deleteItem} color='red' size='large'>
              <Icon name='trash' />
              Obriši stavku
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
      try {
        setLoading(true);
        const { data } = await axios.get<Item>(
          `${process.env.REACT_APP_API}/item/${id}`
        );
        setLoading(false);
        setItem(data);
        initialValues.itemNameCro = data.itemNameCro;
        initialValues.itemNameEng = data.itemNameEng;
        initialValues.retailPrice = data.retailPrice;
        initialValues.vat = data.vat;
      } catch (error) {
        console.log(error);
      }
    };
    getItem();
  }, [id]);

  return (
    <>
      <Button
        className='formPageBackBtn'
        type='button'
        onClick={() => history.push("/item")}
        basic
        size='large'
      >
        Natrag na stavke
      </Button>
      {renderContent()}
    </>
  );
};

export default UpdateItem;
