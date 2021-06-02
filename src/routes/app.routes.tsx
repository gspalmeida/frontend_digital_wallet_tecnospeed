import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CreateFinancialMovement from "../pages/CreateFinancialMovement";
import HomeUser from "../pages/HomeUser";

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomeUser} />
        <Route path="/novamovimentacao" component={CreateFinancialMovement} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRoutes;
