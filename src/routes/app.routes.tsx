import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CreateFinancialMovement from "../pages/CreateFinancialMovement";
import CreateFinancialMovementCategory from "../pages/CreateFinancialMovementCategory";
import HomeUser from "../pages/HomeUser";

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomeUser} />
        <Route path="/novamovimentacao" component={CreateFinancialMovement} />
        <Route path="/categories" component={CreateFinancialMovementCategory} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRoutes;
