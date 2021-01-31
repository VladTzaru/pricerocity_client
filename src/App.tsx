import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";

import { useBuyer } from "./store/buyer";

// Custom components imports
import Header from "./components/Header";
import ItemListPage from "./pages/item/ItemListPage";

// Custom page imports
import FormsPage from "./pages/FormsPage";
import ItemEditPage from "./pages/item/ItemEditPage";
import BuyerList from "./pages/buyer/BuyerListPage";
import PrintPage from "./pages/PrintPage";

const App = () => {
  const { getBuyers } = useBuyer((state) => state);
  useEffect(() => {
    getBuyers();
  }, [getBuyers]);

  return (
    <>
      <Header />
      <Container className='main'>
        <Switch>
          <Route path='/forms/:id' component={FormsPage} />
          <Route exact path='/item' component={ItemListPage} />
          <Route path='/item/:id' component={ItemEditPage} />
          <Route path='/print' component={PrintPage} />
          <Route path='/buyer' component={BuyerList} />
        </Switch>
      </Container>
    </>
  );
};

export default App;
