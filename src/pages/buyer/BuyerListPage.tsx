import React, { useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, List } from "semantic-ui-react";
import { NO_CONTENT } from "../../constants";
import { useBuyer } from "../../store/buyer";

import { MatchParams } from "../../types";
import { replaceStringChunk } from "../../utility/utils";

const BuyerListPage: React.FC<RouteComponentProps<MatchParams>> = ({
  match,
}) => {
  const { getBuyers, buyers } = useBuyer((state) => state);
  const { url } = match;
  const searchTerm = replaceStringChunk(url, "/");
  useEffect(() => {
    getBuyers(searchTerm);
  }, [searchTerm, getBuyers]);

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
