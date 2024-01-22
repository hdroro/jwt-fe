import { useContext } from "react";
import { Redirect, Route } from "react-router-dom/cjs/react-router-dom.min";
import { UserContext } from "../context/UserContext";

const PrivateRoutes = (props) => {
  const { user } = useContext(UserContext);

  return user && user.isAuthenticated ? (
    <Route path={props.path} component={props.component} />
  ) : (
    <>
      <Redirect to="/login"></Redirect>
    </>
  );
};

export default PrivateRoutes;
