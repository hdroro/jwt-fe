import axios from "axios";

const registerNewUser = (email, phone, username, password) => {
  return axios.post("http://localhost:8080/api/v1/register", {
    email,
    phone,
    username,
    password,
  });
};

const handleUserLogin = (valueLogin, password) => {
  return axios.post("http://localhost:8080/api/v1/login", {
    valueLogin,
    password,
  });
};

const fetchAllUsers = (page, limit) => {
  return axios.get("http://localhost:8080/api/v1/user/read", {
    params: {
      page,
      limit,
    },
  });
};

const handleDeleteUser = (id) => {
  return axios.delete("http://localhost:8080/api/v1/user/delete", {
    data: { id: id },
  });
};

export { registerNewUser, handleUserLogin, fetchAllUsers, handleDeleteUser };
