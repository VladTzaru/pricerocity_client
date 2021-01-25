import React from "react";
import { Route, Switch } from "react-router-dom";

// Custom components imports
import Header from "./components/Header";
import InvoiceR1 from "./components/forms/InvoiceR1";

// Custom page imports
import FormsPage from "./pages/FormsPage";

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path='/forms/:id' component={FormsPage} />
      </Switch>
    </>
  );
};

export default App;
