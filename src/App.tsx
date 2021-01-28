import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";

// Custom components imports
import Header from "./components/Header";
import ItemListPage from "./pages/item/ItemListPage";

// Custom page imports
import FormsPage from "./pages/FormsPage";
import ItemEditPage from "./pages/item/ItemEditPage";
import BuyerList from "./pages/buyer/BuyerListPage";
import SideMenu from "./components/SideMenu";

const App = () => {
  return (
    <>
      <Header />
      <SideMenu />
      <Container className='main'>
        <Switch>
          <Route path='/forms/:id' component={FormsPage} />
          <Route exact path='/item' component={ItemListPage} />
          <Route path='/item/:id' component={ItemEditPage} />
          <Route path='/buyer' component={BuyerList} />
        </Switch>
      </Container>
    </>
  );
};

export default App;
