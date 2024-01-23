import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { updateRole } from "../../services/roleService";

function ModalEdit(props) {
  let dataModal = props.dataModel;
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  const [isValidUrl, setIsValidUrl] = useState(true);

  useEffect(() => {
    setUrl(dataModal.url);
    setDescription(dataModal.description);
  }, [dataModal]);

  const handleUpdateRole = async () => {
    setIsValidUrl(true);
    if (!url) {
      toast.error("URL is required !");
      setIsValidUrl(false);
    } else {
      let response = await updateRole(dataModal.id, url, description);
      if (+response.EC === 0) {
        toast.success(response.EM);
        props.handleCloseModalEdit();
        setUrl("");
        setDescription("");
      } else toast.error(response.EM);
    }
  };

  return (
    <>
      <Modal
        size="lg"
        show={props.isShowModalEdit}
        onHide={props.handleCloseModalEdit}
        className="modal-user"
      >
        <Modal.Dialog style={{ margin: 0, maxWidth: "100%" }}>
          <Modal.Header closeButton>
            <Modal.Title>
              <span>Edit role</span>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="content-body">
              <div className="row">
                <div className="col-12 col-sm-6 form-group">
                  <label>
                    URL (<span className="required-red">*</span>):
                  </label>
                  <input
                    className={`form-control ${isValidUrl ? "" : "is-invalid"}`}
                    type="text"
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}
                  />
                </div>
                <div className="col-12 col-sm-6 form-group">
                  <label>Description:</label>
                  <input
                    className="form-control"
                    type="text"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </div>
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleCloseModalEdit}>
              Cancer
            </Button>
            <Button variant="primary" onClick={handleUpdateRole}>
              Update
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </>
  );
}

export default ModalEdit;
