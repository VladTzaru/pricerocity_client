import React, { useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, List } from "semantic-ui-react";
import { NO_CONTENT } from "../../constants";
import { useItem } from "../../store/item";
import { MatchParams } from "../../types";
import { replaceStringChunk } from "../../utility/utils";

const ItemListPage: React.FC<RouteComponentProps<MatchParams>> = ({
  match,
}) => {
  const { url } = match;
  const searchTerm = replaceStringChunk(url, "/");
  const { items, getItems } = useItem();

  const renderContent = () => {
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
              <List.Header as={Link} to={`/item/${item.id}`}>
                {item.itemNameCro}
              </List.Header>
            </List.Content>
          </List.Item>
        ))}
      </List>
    );
  };

  useEffect(() => {
    getItems(searchTerm);
  }, [searchTerm, getItems]);
  return (
    <div>
      <h1>Sve stavke ({items.length})</h1>
      {renderContent()}
    </div>
  );
};

export default ItemListPage;
