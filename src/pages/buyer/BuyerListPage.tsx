import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, List } from "semantic-ui-react";
import { LOADING, NO_CONTENT } from "../../constants";
import { Buyer, MatchParams } from "../../types";
import { replaceStringChunk } from "../../utility/utils";

const BuyerListPage: React.FC<RouteComponentProps<MatchParams>> = ({
  match,
}) => {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [loading, setLoading] = useState(false);
  const { url } = match;
  const searchTerm = replaceStringChunk(url, "/");

  const renderContent = () => {
    if (loading) return <h4>{LOADING}</h4>;

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

  useEffect(() => {
    const getBuyers = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get<Buyer[]>(
          `${process.env.REACT_APP_API}/${searchTerm}`
        );

        setLoading(false);
        setBuyers(data);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    getBuyers();
  }, [searchTerm]);
  return (
    <div>
      <h1>Svi kupci ({buyers.length})</h1>
      {renderContent()}
    </div>
  );
};

export default BuyerListPage;
