import React from "react";
import { RouteComponentProps } from "react-router";
import InvoiceR1 from "../components/forms/InvoiceR1";
import { ComponentMapping, MatchParams } from "../types";

const componentMapping: ComponentMapping[] = [
  {
    id: "invoice_r1",
    name: InvoiceR1,
  },
];

const FormsPage: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {
  const { url } = match;
  const componentId = url.replace("/forms/", "");

  const displayForm = (components: ComponentMapping[], id: string) => {
    let ComponentToRender!: React.FC;
    return components.map((component) => {
      if (component.id === componentId) ComponentToRender = component.name;
      return <ComponentToRender key={component.id} />;
    });
  };

  return (
    <div>
      <h1>Forms Page</h1>
      {displayForm(componentMapping, url)}
    </div>
  );
};

export default FormsPage;
