import React from "react";
import { Route, Switch } from "react-router-dom";

// Custom components imports
import Header from "./components/Header";
import InvoiceR1 from "./components/forms/InvoiceR1";

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route component={InvoiceR1} path='/forms/invoice_r1' />
      </Switch>
    </>
  );
};

export default App;
