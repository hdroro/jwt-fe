import Nav from "./components/Navigation/Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
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
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/" exact>
              Home
            </Route>
            <Route path="*">404 NOT FOUND</Route>
          </Switch>
        </div>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
