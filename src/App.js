import Nav from "./components/Navigation/Nav";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.scss";
import Login from "./components/Login/Login";
function App() {
  return (
    <Router>
      <div className="app-container">
        <Nav />
        <Switch>
          <Route path="/about">About</Route>
          <Route path="/news">News</Route>
          <Route path="/contact">Contact</Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/" exact>
            Home
          </Route>
          <Route path="*">404 NOT FOUND</Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
