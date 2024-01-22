import { useContext, useEffect } from "react";
import { Route, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { UserContext } from "../context/UserContext";

const PrivateRoutes = (props) => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  useEffect(() => {
    console.log(">>check context user:", user);
    let session = sessionStorage.getItem("account");
    if (!session) {
      history.push("/login");
      // window.location.reload();
    }
  }, []);
  return (
    <>
      <Route path={props.path} component={props.component} />
    </>
  );
};

export default PrivateRoutes;
