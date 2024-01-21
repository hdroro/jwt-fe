import axios from "../setup/axios";

const fetchAllGroups = () => {
  return axios.get("/api/v1/group/read", {});
};

export { fetchAllGroups };
