import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.css";
import Home from "./components/pages/home/Home";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import UserList from "./components/pages/userList/UserList";
import New from "./components/pages/userList/new/New";
import { userInputs } from "./components/pages/newTablesrc";
import { ServicesInputs } from "./components/pages/newTablesrc";
import Login from "./components/pages/login/Login";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import Contactus from "./components/pages/Contactform/Contactus";
import Service from "./components/pages/serviceform/Service";
import News from "./components/pages/serviceform/news/News";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <div className={darkMode ? "app dark" : "app"}>
        <Topbar />

        <div className="container">
          <Sidebar />

          <Routes>
            <Route path="/">
              <Route path="login" element={<Login />} />

              <Route
                path="/"
                element={
                  <RequireAuth>
                    <Home />
                  </RequireAuth>
                }
              />
              <Route
                exact
                path="/users"
                element={
                  <RequireAuth>
                    <UserList />
                  </RequireAuth>
                }
              />
              <Route
                exact
                path="/Newuser"
                element={<New inputs={userInputs} title="Add new user" />}
              />
              <Route
                exact
                path="/Contact"
                element={
                  <RequireAuth>
                    <Contactus />
                  </RequireAuth>
                }
              />
              <Route
                exact
                path="/Service"
                element={
                  <RequireAuth>
                    <Service />
                  </RequireAuth>
                }
              />
              <Route
                exact
                path="/News"
                element={
                  <News inputs={ServicesInputs} title="Add new services" />
                }
              />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
