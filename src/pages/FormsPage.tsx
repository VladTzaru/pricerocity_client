import React from "react";
import { RouteComponentProps } from "react-router";
import componentMapping from "../config/componentMapping";
import { ComponentMapping, MatchParams } from "../types";

const FormsPage: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {
  const { url } = match;
  const componentId = url.replace("/forms/", "");

  const displayForm = (components: ComponentMapping[], id: string) => {
    let Component: React.FC;
    Component = components.filter((component) => component.id === id)[0].name;
    return <Component />;
  };

  return (
    <div>
      <h1>Forms Page</h1>
      {displayForm(componentMapping, componentId)}
    </div>
  );
};

export default FormsPage;
