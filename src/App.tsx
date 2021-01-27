import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";

// Custom components imports
import Header from "./components/Header";
import ItemListPage from "./pages/item/ItemListPage";

// Custom page imports
import FormsPage from "./pages/FormsPage";
import ItemEditPage from "./pages/item/ItemEditPage";
import BuyerPage from "./pages/BuyerPage";
import SideMenu from "./components/forms/SideMenu";

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
          <Route path='/buyers' component={BuyerPage} />
        </Switch>
      </Container>
    </>
  );
};

export default App;
