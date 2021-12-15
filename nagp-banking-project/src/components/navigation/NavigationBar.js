import React from "react";
import { Nav, NavLink, Bars, NavMenu } from "../../NavBarElements";
import { BrowserRouter, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { createBrowserHistory } from "history";
import avatar from './avatar.png';

const NavigationBar = (props) => {
  const history = createBrowserHistory({ forceRefresh: true });
  function logout() {
    localStorage.setItem("authenticated", null);
    history.push("/");
  }

  function login() {
    history.push("/");
  }

  function signup() {
    history.push("/signup");
  }
  let isAuthenticated = localStorage.getItem("authenticated") === "yes";
  if (isAuthenticated) {
    return (
      <>
        <Nav>
          <Bars />
          <NavMenu>
            <NavLink
              to="/"
              activeStyle={{
                fontWeight: "bold",
                color: "red",
              }}
            >
              Home
            </NavLink>
            <NavLink
              to="/profile"
              activeStyle={{
                fontWeight: "bold",
                color: "red",
              }}
            >
              My Profile
            </NavLink>
            <NavLink
              to="/transact"
              activeStyle={{
                fontWeight: "bold",
                color: "red",
              }}
            >
              Withdraw/Deposit
            </NavLink>
            <div>
              <Button
                variant="primary"
                block="true"
                size="md"
                type="button"
                onClick={logout}
                style={{ right: "5%", position: "absolute", marginTop: "-1.1%" }}
              >
                Logout
              </Button>
              <Link to="/profile">
              <img src={avatar} alt="logo" style={{height:'40px', width:'40px',right: "1%", position: "absolute", marginTop: "-1.1%" }}/>
              </Link>
            </div>
          </NavMenu>
        </Nav>
      </>
    );
  } else {
    return (
      <>
        <Nav>
          <Bars />
          <BrowserRouter>
            <span style={{ width: "100%" }}>
              <br />
              <Button
                variant="primary"
                block="true"
                size="md"
                type="button"
                onClick={login}
              >
                Log In
              </Button>

              <Button
                variant="primary"
                block="true"
                size="md"
                type="button"
                onClick={signup}
                style={{ marginLeft: "4%" }}
              >
                Sign Up
              </Button>
            </span>
          </BrowserRouter>
        </Nav>
      </>
    );
  }
};

export default NavigationBar;
