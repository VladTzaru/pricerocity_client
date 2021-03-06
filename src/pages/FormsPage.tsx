import React from "react";
import { RouteComponentProps } from "react-router";
import { Header, Icon } from "semantic-ui-react";
import { componentMapping, FormsToCro } from "../config/componentMapping";
import { ComponentMapping, MatchParams } from "../types";
import { replaceStringChunk } from "../utility/utils";

const FormsPage: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {
  const { url } = match;
  const componentId = replaceStringChunk(url, "/forms/");

  const displayForm = (
    components: ComponentMapping[],
    id: string,
    props?: any
  ) => {
    let Component: React.FC;
    Component = components.filter((component) => component.id === id)[0].name;
    return <Component {...props} />;
  };

  return (
    <>
      <Header
        color='blue'
        className='formPageHeader'
        as='h1'
        icon
        textAlign='center'
      >
        <Icon name='file' circular />
        <Header.Content>{FormsToCro[componentId]}</Header.Content>
      </Header>
      {displayForm(componentMapping, componentId)}
    </>
  );
};

export default FormsPage;
