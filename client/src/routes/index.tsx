import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/register";
import AppContext from "../context/AppContext";
import Plans from "../pages/plans";
import Home from "../pages/home";
import MeetRoom from "../pages/meet-room";

export function ProtectedRoutes() {
  const { isRegister } = AppContext();
  return (
    <Routes>
      <Route path="/">
        {isRegister ? (
          <Route index element={<Plans />} />
        ) : (
          <Route index element={<Home />} />
        )}
        <Route index element={<Home />} />
        <Route path={"/meet-room/:meetCode"} element={<MeetRoom />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Route>
    </Routes>
  );
}
export function PublicRoutes() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Route>
    </Routes>
  );
}
