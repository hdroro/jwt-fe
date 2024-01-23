import { useEffect, useState } from "react";
import "./GroupRole.scss";
import { fetchAllGroups } from "../../services/groupService";
import {
  assignRolesToGroup,
  fetchAllRoles,
  fetchAllRolesByGroup,
} from "../../services/roleService";
import _ from "lodash";
import { toast } from "react-toastify";

function GroupRole() {
  const [listRoles, setListRoles] = useState([]);
  const [listGroups, setListGroups] = useState([]);
  const [selectGroup, setSelectGroup] = useState("");
  const [assignRoleByGroup, setAssignRoleByGroup] = useState([]);

  useEffect(() => {
    fetchGroups();
    fetchAllRole();
  }, []);

  const fetchGroups = async () => {
    let response = await fetchAllGroups();
    if (response && response.EC === 0) {
      setListGroups(response.DT);
    }
  };

  const fetchAllRole = async () => {
    let response = await fetchAllRoles();
    if (response && response.EC === 0) {
      setListRoles(response.DT);
    }
  };

  const handleOnChangeGroup = async (groupId) => {
    setSelectGroup(groupId);
    if (groupId) {
      let response = await fetchAllRolesByGroup(groupId);
      if (response && +response.EC === 0) {
        let re = buildDataRolesByGroup(response.DT, listRoles);
        setAssignRoleByGroup(re);
      }
    }
  };

  const buildDataRolesByGroup = (groupRoles, allRoles) => {
    let result = [];
    if (allRoles && allRoles.length > 0) {
      allRoles.map((role) => {
        let object = {};
        console.log("rolerole", role);
        object.id = role.id;
        object.url = role.url;
        object.description = role.description;

        object.isAssigned = false;

        if (groupRoles && groupRoles.length > 0) {
          object.isAssigned = groupRoles.some(
            (item) => item.Roles.url === object.url
          );
        }

        result.push(object);
      });
    }

    return result;
  };

  const handleSelectRole = (value) => {
    const _assignRoleByGroup = _.cloneDeep(assignRoleByGroup);

    let foundIndex = _assignRoleByGroup.findIndex(
      (item) => +item.id === +value
    );
    if (foundIndex > -1)
      _assignRoleByGroup[foundIndex].isAssigned =
        !_assignRoleByGroup[foundIndex].isAssigned;

    setAssignRoleByGroup(_assignRoleByGroup);
  };

  const buildDataToSave = () => {
    let result = {};
    const _assignRoleByGroup = _.cloneDeep(assignRoleByGroup);
    result.groupId = selectGroup;

    let groupRolesFilter = _assignRoleByGroup.filter(
      (item) => item.isAssigned === true
    );

    let finalGroupRoles = groupRolesFilter.map((item) => {
      let item_ = { groupId: +selectGroup, roleId: +item.id };
      return item_;
    });
    console.log("finalGroupRoles", finalGroupRoles);
    result.groupRoles = finalGroupRoles;

    return result;
  };

  const handleSave = async () => {
    let data = buildDataToSave();
    let res = await assignRolesToGroup(data);
    if (res && res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <div className="group-role-container">
      <div className="container">
        <div className="container mt-3">
          <h4>Group Role: </h4>
          <div className="assign-group-role">
            <div className="col-12 col-sm-6 form-group">
              <label>
                Select Group (<span className="required-red">*</span>):
              </label>

              <select
                className="form-select"
                onChange={(event) => handleOnChangeGroup(event.target.value)}
              >
                <option value={""}>--Please select a group--</option>
                {listGroups &&
                  listGroups.length > 0 &&
                  listGroups.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            <hr />
            {selectGroup && (
              <>
                <div className="all-roles">
                  <h5>Assigned role:</h5>
                  {assignRoleByGroup &&
                    assignRoleByGroup.length &&
                    assignRoleByGroup.map((item, index) => (
                      <div className="form-check" key={index}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={item.id}
                          id={`flexCheckChecked-${index}`}
                          checked={item.isAssigned}
                          onChange={(event) =>
                            handleSelectRole(event.target.value)
                          }
                        />
                        <label
                          className="form-check-label"
                          for={`flexCheckChecked-${index}`}
                        >
                          {item.url}
                        </label>
                      </div>
                    ))}
                </div>

                <div className="mt-3">
                  <button
                    className="btn btn-warning"
                    onClick={() => handleSave()}
                  >
                    Save
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupRole;
