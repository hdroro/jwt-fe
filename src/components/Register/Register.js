import { useState } from "react";
import "./Register.scss";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerNewUser } from "../../services/userService";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const defaultValidInput = {
    isValidEmail: true,
    isValidPhone: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  };
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

  const history = useHistory();
  const handleBackToLogin = () => {
    history.push("/login");
  };

  const handleRegister = async () => {
    let check = isValidInputs();
    let userData = { email, phone, username, password };
    console.log(">> check userData", userData);

    if (check) {
      let response = await registerNewUser(email, phone, username, password);
      let serverData = response.data;
      if (+serverData.EC === 0) {
        toast.success(serverData.EM);
        history.push("/login");
      } else toast.error(serverData.EM);
    }
  };

  const isValidInputs = () => {
    setObjCheckInput(defaultValidInput);
    let re = /\S+@\S+\.\S+/;
    if (!email) {
      toast.error("Email is required !");
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      return false;
    }
    if (!re.test(email)) {
      toast.error("Please enter a valid email address !");
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      return false;
    }
    if (!phone) {
      toast.error("Phonenumber is required !");
      setObjCheckInput({ ...defaultValidInput, isValidPhone: false });
      return false;
    }
    if (!password) {
      toast.error("Password is required !");
      setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Your password is not the same !");
      setObjCheckInput({ ...defaultValidInput, isValidConfirmPassword: false });
      return false;
    }

    return true;
  };

  // useEffect(() => {
  //   axios.get("http://localhost:8080/api/v1/test-api").then((data) => {
  //     console.log(">>> check data axios: ", data);
  //   });
  // }, []);

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
                className={`form-control ${
                  objCheckInput.isValidEmail ? "" : "is-invalid"
                }`}
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
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Phone:</label>
              <input
                type="text"
                className={`form-control ${
                  objCheckInput.isValidPhone ? "" : "is-invalid"
                }`}
                placeholder="Phone number"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                className={`form-control ${
                  objCheckInput.isValidPassword ? "" : "is-invalid"
                }`}
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div>
              <label>Repeat password:</label>
              <input
                type="password"
                className={`form-control ${
                  objCheckInput.isValidConfirmPassword ? "" : "is-invalid"
                }`}
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
