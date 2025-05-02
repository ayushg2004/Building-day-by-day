// src/components/Navbar.jsx
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import "../styles/index.css";

const Navbar = () => {
  const navigate = useNavigate();

  // ⏰ Clock state and popup toggle state
  const [time, setTime] = useState(dayjs().format("HH:mm:ss"));
  const [showPopup, setShowPopup] = useState(false);

  // 📌 Real-time clock effect (updates every second)
  useEffect(() => {
    const interval = setInterval(() => {
      const indianTime = dayjs().format("HH:mm:ss"); // You could add `.tz("Asia/Kolkata")` with plugin
      setTime(indianTime);
    }, 1000);
    return () => clearInterval(interval); // cleanup
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <h2 className="navbar-logo">🛒 Shop</h2>
        <div className="clock" onClick={() => setShowPopup(true)}>
          {time} IST
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      {/* 🧾 Popup Modal */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <button className="close-btn" onClick={() => setShowPopup(false)}>
              ❌
            </button>
            <h2>🕒 Current Time</h2>
            <p>{dayjs().format("dddd, MMMM D, YYYY")}</p>
            <p>{time} IST</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
