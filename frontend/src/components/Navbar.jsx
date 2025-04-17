// src/components/Navbar.jsx
import { useNavigate } from "react-router-dom";
import "../styles/index.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    navigate("/login"); // Redirect to login
  };

  return (
    <nav className="navbar">
      <h2 className="navbar-logo">🛒 Shop</h2>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
