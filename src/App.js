import Nav from "./components/Navigation/Nav";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.scss";
import { UserContext } from "./context/UserContext";

import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes/AppRoutes";
import { Rings } from "react-loader-spinner";
import { useContext } from "react";

function App() {
  const { user } = useContext(UserContext);

  return (
    <>
      <Router>
        {user && user.isLoading ? (
          <div className="loading-container">
            <Rings color="#00BFFF" height={80} width={80} />
            <div>Loading data ...</div>
          </div>
        ) : (
          <>
            <div className="app-header">
              <Nav />
            </div>
            <div className="app-container">
              <AppRoutes />
            </div>
          </>
        )}
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
