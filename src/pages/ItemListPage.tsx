import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, List } from "semantic-ui-react";
import { LOADING, NO_CONTENT } from "../constants";
import { Item, MatchParams } from "../types";
import { replaceStringChunk } from "../utility/utils";

const ItemListPage: React.FC<RouteComponentProps<MatchParams>> = ({
  match,
}) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const { url } = match;
  const searchTerm = replaceStringChunk(url, "/");

  const renderContent = () => {
    if (loading) return <h4>{LOADING}</h4>;

    if (items.length === 0)
      return (
        <>
          <h4>{NO_CONTENT} </h4>
          <Button as={Link} to='/forms/new_item' primary>
            Dodaj novu stavku
          </Button>
        </>
      );

    return (
      <List divided relaxed>
        {items.map((item) => (
          <List.Item key={item.id}>
            <List.Content>
              <List.Header as='a'>{item.itemNameCro}</List.Header>
              <List.Description as='a'>{item.createdAt}</List.Description>
            </List.Content>
          </List.Item>
        ))}
      </List>
    );
  };

  useEffect(() => {
    const getItems = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get<Item[]>(
          `${process.env.REACT_APP_API}/${searchTerm}`
        );

        setLoading(false);
        setItems(data);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    getItems();
  }, [searchTerm]);
  return (
    <div>
      <h1>Sve stavke</h1>
      {renderContent()}
    </div>
  );
};

export default ItemListPage;
