import { useState } from "react";
import "./Login.scss";
import { useHistory } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const handleCreateNewAccount = () => {
    history.push("/register");
  };

  const handleLogin = () => {
    let userData = { email, password };
    console.log(">>check userData", userData);
  };

  return (
    <div className="login-container">
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div className="content-left col-12 d-none col-sm-7 d-sm-block">
            <div className="brand">facebook</div>
            <div className="detail">
              Facebook helps you connect and share with the people in your life.
            </div>
          </div>
          <div className="content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3">
            <div className="brand d-sm-none d-flex justify-content-center">
              facebook
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Email address or your phone number"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button className="btn btn-primary" onClick={() => handleLogin()}>
              Login
            </button>
            <span className="text-center">
              <a className="forgotten-password" href="#">
                Forgotten password?
              </a>
            </span>
            <hr />
            <div className="text-center">
              <button
                className="btn btn-success"
                onClick={() => handleCreateNewAccount()}
              >
                Create new account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
