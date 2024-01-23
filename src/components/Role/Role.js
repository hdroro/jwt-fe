import "./Role.scss";
import { PlusIcon, TrashIcon } from "../Icon/Icon";
import { useRef, useState } from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { createNewRole } from "../../services/roleService";
import TableRole from "./TableRole";

function Role() {
  const dataChildDefault = {
    url: "",
    description: "",
    isValidUrl: true,
  };
  const [listChilds, setListChilds] = useState({
    child1: dataChildDefault,
  });

  const childRef = useRef();

  const handleOnChangeInput = (name, value, key) => {
    let _listChilds = _.cloneDeep(listChilds);
    _listChilds[key][name] = value;
    if (value && name === "url") {
      _listChilds[key]["isValidUrl"] = true;
    }
    setListChilds(_listChilds);
  };

  const handleAddNewInput = () => {
    let _listChilds = _.cloneDeep(listChilds);
    _listChilds[`child-${uuidv4()}`] = {
      dataChildDefault,
    };

    setListChilds(_listChilds);
  };

  const handleDeleteInput = (key) => {
    let _listChilds = _.cloneDeep(listChilds);
    delete _listChilds[key];

    setListChilds(_listChilds);
  };

  const buildDataToPersist = () => {
    let _listChilds = _.cloneDeep(listChilds);
    let result = [];
    Object.entries(_listChilds).map(([key, child], index) => {
      result.push({
        url: child.url,
        description: child.description,
      });
    });

    return result;
  };

  const handleSave = async () => {
    let invalidObj = Object.entries(listChilds).find(([key, child], index) => {
      return child && !child.url;
    });

    if (!invalidObj) {
      let data = buildDataToPersist();
      let res = await createNewRole(data);

      if (res && res.EC === 0) {
        toast.success(res.EM);
        childRef.current.fetchListRolesAgain();
      }
    } else {
      toast.error("Input URL must not be empty!");
      let _listChilds = _.cloneDeep(listChilds);
      const key = invalidObj[0];
      _listChilds[key]["isValidUrl"] = false;
      setListChilds(_listChilds);
    }
  };

  return (
    <div className="role-container">
      <div className="container">
        <div className="adding-roles mt-3">
          <div className="title-role">
            <h4>Add new role...</h4>
          </div>
          <div className="role-parent">
            {Object.entries(listChilds).map(([key, child], index) => {
              return (
                <div className="row role-child" key={`child-${key}`}>
                  <div className={`col-5 form-group ${key}`}>
                    <label className="url">URL:</label>
                    <input
                      type="text"
                      className={`form-control ${
                        !child.isValidUrl ? "is-invalid" : ""
                      }`}
                      value={child.url}
                      onChange={(event) =>
                        handleOnChangeInput("url", event.target.value, key)
                      }
                    />
                  </div>
                  <div className="col-5 form-group">
                    <label className="description">DESCRIPTION:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={child.description}
                      onChange={(event) =>
                        handleOnChangeInput(
                          "description",
                          event.target.value,
                          key
                        )
                      }
                    />
                  </div>

                  <div className="col-2 mt-4 actions">
                    <PlusIcon
                      className="add-new-role"
                      onClick={() => handleAddNewInput()}
                    />
                    {index >= 1 && (
                      <TrashIcon
                        className="delete-role"
                        onClick={() => handleDeleteInput(key)}
                      />
                    )}
                  </div>
                </div>
              );
            })}
            <div>
              <button
                className="btn btn-warning mt-3"
                onClick={() => handleSave()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div className="mt-3">
          <h4>List current Roles:</h4>
          <TableRole ref={childRef} />
        </div>
      </div>
    </div>
  );
}

export default Role;
