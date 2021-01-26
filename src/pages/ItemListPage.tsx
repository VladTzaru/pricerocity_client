import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Item, MatchParams } from "../types";
import { replaceStringChunk } from "../utility/utils";

const ItemListPage: React.FC<RouteComponentProps<MatchParams>> = ({
  match,
}) => {
  const [items, setItems] = useState<AxiosResponse<Item[]> | null>(null);
  const { url } = match;
  const searchTerm = replaceStringChunk(url, "/");

  useEffect(() => {
    if (!items) {
      const getItems = async () => {
        const response = await axios.get<Item[]>(
          `${process.env.REACT_APP_API}/${searchTerm}`
        );
        setItems(response);
      };
      getItems();
    }
  }, [items, searchTerm]);
  return (
    <div>
      <h1>ITEM LIST</h1>
    </div>
  );
};

export default ItemListPage;
