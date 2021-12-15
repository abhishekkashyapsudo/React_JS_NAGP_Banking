import "./App.css";
import Login from "./components/login/login";
import { BrowserRouter } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import NavigationBar from "./components/navigation/NavigationBar";
import Signup from "./components/login/signup";
import Transact from "./components/transact/transact";
import Profile from "./components/profile/profile";
import Home from "./components/main_store/App";

export function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar />
        <Switch>
          <Route
            exact
            path="/"
            component={
              localStorage.getItem("authenticated") === "yes"
                ? () => <Home />
                : () => <Login />
            }
          />

          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/profile" component={Profile} />

          <Route exact path="/transact" component={Transact} />
          <Route exact path="/home" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
