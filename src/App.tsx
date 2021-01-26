import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";

// Custom components imports
import Header from "./components/Header";
import ItemListPage from './pages/ItemListPage'

// Custom page imports
import FormsPage from "./pages/FormsPage";

const App = () => {
  return (
    <>
      <Header />
      <Container className='main'>
        <Switch>
          <Route path='/forms/:id' component={FormsPage} />
          <Route path='/item' component={ItemListPage} />
        </Switch>
      </Container>
    </>
  );
};

export default App;
