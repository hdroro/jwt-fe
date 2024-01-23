import axios from "../setup/axios";

const fetchAllRoles = (page, limit) => {
  return axios.get("/api/v1/role/read", {
    params: {
      page,
      limit,
    },
  });
};

const createNewRole = (roles) => {
  return axios.post("/api/v1/role/create", [...roles]);
};

const deleteRole = (id) => {
  return axios.delete("/api/v1/role/delete", { data: { id: id } });
};

const updateRole = (id, url, description) => {
  return axios.put("/api/v1/role/update", { id, url, description });
};
export { fetchAllRoles, createNewRole, deleteRole, updateRole };
