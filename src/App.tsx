import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";

// Custom components imports
import Header from "./components/Header";

// Custom page imports
import FormsPage from "./pages/FormsPage";

const App = () => {
  return (
    <>
      <Header />
      <Container style={{ marginTop: "4rem" }}>
        <Switch>
          <Route path='/forms/:id' component={FormsPage} />
        </Switch>
      </Container>
    </>
  );
};

export default App;
