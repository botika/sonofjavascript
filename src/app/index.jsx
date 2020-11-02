import React from "react";
import { Route, Switch } from "react-router";
import Container from "app/Container";
import Details from "app/Details";

export default function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Container />
      </Route>
      <Route path="/pokemon/:name">
        <Details />
      </Route>
    </Switch>
  );
}
