import "./Role.scss";
import { PlusIcon, TrashIcon } from "../Icon/Icon";
import { useState } from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

function Role() {
  const [listChilds, setListChilds] = useState({
    child1: { url: "", description: "" },
  });

  const handleOnChangeInput = (name, value, key) => {
    let _listChilds = _.cloneDeep(listChilds);
    _listChilds[key][name] = value;
    setListChilds(_listChilds);
  };

  const handleAddNewInput = () => {
    let _listChilds = _.cloneDeep(listChilds);
    _listChilds[`child-${uuidv4()}`] = {
      url: "",
      description: "",
    };

    setListChilds(_listChilds);
  };

  const handleDeleteInput = (key) => {
    let _listChilds = _.cloneDeep(listChilds);
    delete _listChilds[key];

    setListChilds(_listChilds);
  };

  return (
    <div className="role-container">
      <div className="container">
        <div className="mt-3">
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
                      className="form-control"
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
              <button className="btn btn-warning mt-3">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Role;
