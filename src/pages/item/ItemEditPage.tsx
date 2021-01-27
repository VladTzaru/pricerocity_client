import { RouteComponentProps } from "react-router-dom";
import UpdateItem from "../../components/forms/item/UpdateItem";
import { MatchParams } from "../../types";
import { replaceStringChunk } from "../../utility/utils";

const ItemEditPage: React.FC<RouteComponentProps<MatchParams>> = ({
  match,
}) => {
  const { url } = match;
  const itemId = replaceStringChunk(url, "/item/");
  return <UpdateItem id={itemId} />;
};

export default ItemEditPage;
