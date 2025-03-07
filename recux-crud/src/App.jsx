import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import AdminNavbar from "./components/AdminNavbar";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/user-pages/Home";
import About from "./pages/user-pages/About";
import SignIn from "./pages/user-pages/SignIn";
import SignUp from "./pages/user-pages/SignUp";
import Profile from "./pages/user-pages/Profile";

// Admin pages
import AdminHome from "./pages/admin-pages/AdminHome";
import AdminDashboard from "./pages/admin-pages/AdminDashboard";
import UserAdd from "./pages/admin-pages/UserAdd";
import AdminLogin from "./pages/admin-pages/AdminLogin";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import AdminWithoutPrivate from "./components/AdminWithoutPrivate";
import UserWithLogin from "./components/UserWithLogin";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <ToastContainer autoClose={3000} />
    </>
  );
}

function AppRoutes() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Show the appropriate Navbar */}
      {!isAdminRoute ? <Navbar /> : <AdminNavbar />}

      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route element={<UserWithLogin />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route element={<AdminWithoutPrivate />}>
          <Route path="/adminLogin" element={<AdminLogin />} />
        </Route>
        <Route element={<AdminPrivateRoute />}>
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/user-add" element={<UserAdd />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
