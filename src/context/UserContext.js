import { createContext, useEffect, useState } from "react";
import { getUserAccount } from "../services/userService";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  // User is the name of the "data" that gets stored in context
  let dataDefault = {
    isLoading: true,
    isAuthenticated: false,
    token: "",
    account: {},
  };
  const [user, setUser] = useState(dataDefault);

  // Login updates the user data with a name parameter
  const loginContext = (userData) => {
    setUser({ ...userData, isLoading: false });
  };

  // Logout updates the user data to default
  const logout = () => {
    setUser((user) => ({
      name: "",
      auth: false,
    }));
  };

  const fetchUser = async () => {
    let response = await getUserAccount();
    if (response && response.EC === 0) {
      let groupWithRoles = response.DT.groupWithRoles;
      let email = response.DT.email;
      let username = response.DT.username;
      let token = response.DT.access_token;
      //success
      let data = {
        isAuthenticated: true,
        token,
        account: {
          groupWithRoles,
          email,
          username,
        },
        isLoading: false,
      };
      setTimeout(() => {
        setUser(data);
      }, 3000);
    } else {
      setUser({ ...dataDefault, isLoading: false });
    }
  };

  useEffect(() => {
    if (
      window.location.pathname !== "/" ||
      window.location.pathname !== "/login"
    ) {
      fetchUser();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, loginContext, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
