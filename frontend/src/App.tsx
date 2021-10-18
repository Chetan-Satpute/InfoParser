import React, { FC, useState } from "react";
import Home from "./pages/Home";
import Topics from "./pages/Topics";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./styles/App.css";

const App: FC = () => {
  return (
    <Router>
      <div className="overflow-auto h-full p-2">
        <Switch>
          <Route path="/" exact={true}>
            <Home />
          </Route>
          <Route path="/explore" exact={true}>
            <Topics />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
