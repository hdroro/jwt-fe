import { useState } from "react";
import "./Register.scss";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useHistory();
  const handleBackToLogin = () => {
    history.push("/login");
  };

  const handleRegister = () => {
    isValidInputs();
    let userData = { email, phone, username, password };
    console.log(">> check userData", userData);
  };

  const isValidInputs = () => {
    let re = /\S+@\S+\.\S+/;
    if (!email) {
      toast.error("Email is required !");
      return false;
    }
    if (!re.test(email)) {
      toast.error("Please enter a valid email address !");
      return false;
    }
    if (!phone) {
      toast.error("Phonenumber is required !");
      return false;
    }
    if (!password) {
      toast.error("Password is required !");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Your password is not the same !");
      return false;
    }

    return true;
  };

  return (
    <div className="register-container">
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
            <div className="form-group">
              <label>Email:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Phone number"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Phone:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Phone number"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div>
              <label>Repeat password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Repeat Password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>
            <button
              className="btn btn-primary"
              type="submit"
              onClick={() => handleRegister()}
            >
              Register
            </button>
            <span className="text-center">ALready've an account?</span>
            <hr />
            <div className="text-center">
              <button
                className="btn btn-success"
                onClick={() => handleBackToLogin()}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
