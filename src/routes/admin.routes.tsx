import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import HomeAdmin from "../pages/HomeAdmin";

const AdminRoutes: React.FC = () => {
  return (
    <BrowserRouter >
      <Switch>
        <Route exact path="/">
          <Redirect to="/admin" />
        </Route>
        <Route exact path="/admin" component={HomeAdmin} />
      </Switch>
    </BrowserRouter>
  );
};

export default AdminRoutes;
