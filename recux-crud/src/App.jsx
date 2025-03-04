import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

// Use useLocation() inside AppRoutes
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
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/user-add" element={<UserAdd />} />
      </Routes>
    </>
  );
}

export default App;
