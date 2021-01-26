import axios from "axios";
import { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { MatchParams } from "../types";
import { replaceStringChunk } from "../utility/utils";

const ItemListPage: React.FC<RouteComponentProps<MatchParams>> = ({
  match,
}) => {
  const { url } = match;
  const searchTerm = replaceStringChunk(url, "/");

  useEffect(() => {
    const getItems = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/${searchTerm}`
      );
      console.log(response);
    };
    getItems();
  }, []);
  return (
    <div>
      <h1>ITEM LIST</h1>
    </div>
  );
};

export default ItemListPage;
