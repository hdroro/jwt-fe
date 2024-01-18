import { useEffect } from "react";
import { Route, useHistory } from "react-router-dom/cjs/react-router-dom.min";

const PrivateRoutes = (props) => {
  const history = useHistory();
  useEffect(() => {
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
