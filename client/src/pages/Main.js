import React, { useContext, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { Redirect, useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { useForm } from "../util/hooks";
import logo from "../img/logo.png";

function MainLogin(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <>
      <header></header>
      <div className="ui grid container">
        <div className="ui stackable">
          <div className="row">
            <img className="logo" src={logo} fluid alt="" />
          </div>
        </div>
        <div className="form-container">
          <div className="ui stackable">
            <div className="row">
              <Form
                onSubmit={onSubmit}
                noValidate
                className={loading ? "loading" : ""}
              >
                <h1>Log In</h1>
                <Form.Input
                  label="Username"
                  placeholder="Username.."
                  name="username"
                  type="text"
                  value={values.username}
                  error={errors.username ? true : false}
                  onChange={onChange}
                />
                <Form.Input
                  label="Password"
                  placeholder="Password.."
                  name="password"
                  type="password"
                  value={values.password}
                  error={errors.password ? true : false}
                  onChange={onChange}
                />
                <Button
                  onClick={() => Redirect("/")}
                  type="submit"
                  id="login-btn"
                  primary
                >
                  Log In
                </Button>
              </Form>
              <Button
                onClick={() => history.push("/register")}
                id="register-btn"
                primary
              >
                Register
              </Button>
              {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                  <ul className="list">
                    {Object.values(errors).map((value) => (
                      <li key={value}>{value}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <footer></footer>
    </>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default MainLogin;
