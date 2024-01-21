import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { fetchAllGroups } from "../../services/groupService";
import { toast } from "react-toastify";
import { handleCreateUser, handleUpdateUser } from "../../services/userService";

function ModalUser(props) {
  const { action, dataModelUser } = props;
  const [listGroups, setListGroups] = useState([]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState(0);
  const [group, setGroup] = useState(1);

  const validInputDefault = {
    isValidEmail: true,
    isValidPhone: true,
    isValidUsername: true,
    isValidPassword: true,
    isValidAddress: true,
    isValidSex: true,
    isValidGroup: true,
  };
  const [validInputs, setValidInput] = useState(validInputDefault);

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    if (action === "UPDATE") {
      let dataEdit = dataModelUser;
      setEmail(dataEdit.email);
      setPhone(dataEdit.phone);
      setUsername(dataEdit.username);
      setAddress(dataEdit.address);
      setGender(dataEdit.sex === "Nữ" ? 1 : 0);
      setGroup(Object.keys(dataEdit).length !== 0 ? dataEdit.Group?.id : 1);
    } else {
      setEmail("");
      setPhone("");
      setUsername("");
      setAddress("");
      setGender(0);
      setGroup(1);
    }
  }, [action, dataModelUser]);
  const fetchGroups = async () => {
    let response = await fetchAllGroups();
    if (response && response.EC === 0) {
      setListGroups(response.DT);
    }
  };

  const checkValidateInputs = () => {
    //create user
    setValidInput(validInputDefault);
    let re = /\S+@\S+\.\S+/;
    if (!email) {
      toast.error("Email is required !");
      setValidInput({ ...validInputDefault, isValidEmail: false });
      return false;
    }
    if (!re.test(email)) {
      toast.error("Please enter a valid email address !");
      setValidInput({ ...validInputDefault, isValidEmail: false });
      return false;
    }
    if (!phone) {
      toast.error("Phonenumber is required !");
      setValidInput({ ...validInputDefault, isValidPhone: false });
      return false;
    }
    if (action === "CREATE" && !password) {
      toast.error("Password is required !");
      setValidInput({ ...validInputDefault, isValidPassword: false });
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    let check = checkValidateInputs();
    let userData = { email, phone, username, password };
    console.log(">> check userData", userData);
    let gender_;
    if (gender) gender_ = "Nữ";
    else gender_ = "Nam";

    if (check) {
      let response;
      if (action === "CREATE") {
        response = await handleCreateUser(
          email,
          phone,
          username,
          password,
          address,
          gender_,
          group
        );
      } else {
        response = await handleUpdateUser(
          dataModelUser.id,
          username,
          address,
          gender_,
          group
        );
      }
      let serverData = response;
      if (+serverData.EC === 0) {
        toast.success(serverData.EM);
        props.handleCloseModalUser();
        setEmail("");
        setPhone("");
        setAddress("");
        setPassword("");
        setUsername("");
      } else toast.error(serverData.EM);
    }
  };

  return (
    <>
      <Modal
        size="lg"
        show={props.isShowModalUser}
        onHide={props.handleCloseModalUser}
        className="modal-user"
      >
        <Modal.Dialog style={{ margin: 0, maxWidth: "100%" }}>
          <Modal.Header closeButton>
            <Modal.Title>
              <span>
                {action === "CREATE" ? "Create new user" : "Edit a user"}
              </span>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="content-body">
              <div className="row">
                <div className="col-12 col-sm-6 form-group">
                  <label>
                    Email address (<span className="required-red">*</span>):
                  </label>
                  <input
                    className={`form-control ${
                      validInputs.isValidEmail ? "" : "is-invalid"
                    }`}
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    disabled={action === "UPDATE"}
                  />
                </div>
                <div className="col-12 col-sm-6 form-group">
                  <label>
                    Phone number (<span className="required-red">*</span>):
                  </label>
                  <input
                    className={`form-control ${
                      validInputs.isValidPhone ? "" : "is-invalid"
                    }`}
                    type="text"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    disabled={action === "UPDATE"}
                  />
                </div>
                <div className="col-12 col-sm-6 form-group">
                  <label>Username:</label>
                  <input
                    className="form-control"
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </div>

                <div className="col-12 col-sm-6 form-group">
                  <label>
                    Password (<span className="required-red">*</span>):
                  </label>
                  <input
                    className={`form-control ${
                      validInputs.isValidPassword ? "" : "is-invalid"
                    }`}
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    disabled={action === "UPDATE"}
                  />
                </div>

                <div className="col-12 form-group">
                  <label>Address:</label>

                  <input
                    className="form-control"
                    type="text"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                  />
                </div>

                <div className="col-12 col-sm-6 form-group">
                  <label>Gender:</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(event) => setGender(event.target.value)}
                    value={gender}
                  >
                    <option value="0">Male</option>
                    <option value="1">Female</option>
                    <option value="2">Other</option>
                  </select>
                </div>

                <div className="col-12 col-sm-6 form-group">
                  <label>
                    Group (<span className="required-red">*</span>):
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(event) => setGroup(event.target.value)}
                    value={group}
                  >
                    {listGroups &&
                      listGroups.length > 0 &&
                      listGroups.map((item, index) => (
                        <option key={index} value={item.id} f>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleCloseModalUser}>
              Cancer
            </Button>
            <Button variant="primary" onClick={handleSave}>
              {action === "CREATE" ? "Save" : "Update"}
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </>
  );
}

export default ModalUser;
