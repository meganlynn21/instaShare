import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";

import MenuBar from "./components/MenuBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";
import MainLogin from "./pages/Main";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <Switch>
            <AuthRoute exact path="/" component={MainLogin} />
            <div>
              <MenuBar />
              <Route exact path="/home" component={Home} />
              <AuthRoute exact path="/login" component={Login} />
              <AuthRoute exact path="/register" component={Register} />
              <Route exact path="/posts/:postId" component={SinglePost} />
            </div>
          </Switch>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
