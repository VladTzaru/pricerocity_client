import axios from "axios";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { List } from "semantic-ui-react";
import { LOADING } from "../constants";
import { Item, MatchParams } from "../types";
import { replaceStringChunk } from "../utility/utils";

const ItemListPage: React.FC<RouteComponentProps<MatchParams>> = ({
  match,
}) => {
  const [items, setItems] = useState<Item[]>([]);
  const { url } = match;
  const searchTerm = replaceStringChunk(url, "/");

  const renderContent = () => {
    if (items.length === 0) {
      return <h4>{LOADING}</h4>;
    }

    return (
      <List divided relaxed>
        {items.map((item) => (
          <List.Item key={item.id}>
            <List.Icon
              name='product hunt'
              size='large'
              verticalAlign='middle'
            />
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
      const { data } = await axios.get<Item[]>(
        `${process.env.REACT_APP_API}/${searchTerm}`
      );

      setItems(data);
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
