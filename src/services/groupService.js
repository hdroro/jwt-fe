import axios from "axios";

const fetchAllGroups = () => {
  return axios.get("http://localhost:8080/api/v1/group/read", {});
};

export { fetchAllGroups };
