import React from "react";
import { Link } from "react-router-dom";
import { Button, List } from "semantic-ui-react";
import { NO_CONTENT } from "../../constants";
import { useBuyer } from "../../store/buyer";

const BuyerListPage = () => {
  const { buyers } = useBuyer((state) => state);

  const renderContent = () => {
    if (buyers.length === 0)
      return (
        <>
          <h4>{NO_CONTENT} </h4>
          <Button as={Link} to='/forms/new_buyer' primary>
            Dodaj novu kupca
          </Button>
        </>
      );

    return (
      <List divided relaxed>
        {buyers.map((buyer) => (
          <List.Item key={buyer.id}>
            <List.Content>
              <List.Header as={Link} to={`/buyer/${buyer.id}`}>
                {buyer.name}
              </List.Header>
              <List.Description as={Link} to={`/buyer/${buyer.id}`}>
                {buyer.type}
              </List.Description>
            </List.Content>
          </List.Item>
        ))}
      </List>
    );
  };

  return (
    <div>
      <h1>Svi kupci ({buyers.length})</h1>
      {renderContent()}
    </div>
  );
};

export default BuyerListPage;
