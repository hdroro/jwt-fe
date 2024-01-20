import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { fetchAllGroups } from "../../services/groupService";

function ModalUser(props) {
  const [listGroups, setListGroups] = useState([]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [group, setGroup] = useState("");

  useEffect(() => {
    fetchGroups();
  }, []);
  const fetchGroups = async () => {
    let response = await fetchAllGroups();
    if (response && response.data && response.data.EC === 0) {
      setListGroups(response.data.DT);
    }
  };
  return (
    <>
      <Modal size="lg" show className="modal-user">
        <Modal.Dialog style={{ margin: 0, maxWidth: "100%" }}>
          <Modal.Header closeButton>
            <Modal.Title>
              <span>{props.title}</span>
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
                    className="form-control"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div className="col-12 col-sm-6 form-group">
                  <label>
                    Phone number (<span className="required-red">*</span>):
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
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
                    className="form-control"
                    type="text"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>

                <div className="col-12 form-group">
                  <label>
                    Address (<span className="required-red">*</span>):
                  </label>

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
                  >
                    <option defaultValue value={group}>
                      Gender
                    </option>
                    <option value="1" defaultValue>
                      Male
                    </option>
                    <option value="2">Female</option>
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
                  >
                    <option defaultValue>Group</option>
                    {listGroups &&
                      listGroups.length > 0 &&
                      listGroups.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
              Cancer
            </Button>
            <Button variant="primary" onClick={props.handleConfirmDelete}>
              Save
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </>
  );
}

export default ModalUser;
