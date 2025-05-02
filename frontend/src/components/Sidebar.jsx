// src/components/Sidebar.jsx
import { useState } from "react";
import "../styles/sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const openChatbot = () => {
    window.open("https://nexaai.vercel.app/", "_blank");
  };

  return (
    <>
      <div className={`sidebar-wrapper ${isOpen ? "shifted" : ""}`}>
        <button className="toggle-btn" onClick={toggleSidebar}>
          ☰
        </button>
        <div className={`sidebar ${isOpen ? "open" : ""}`}>
          <button className="sidebar-btn" onClick={openChatbot}>
            🤖 Chatbot
          </button>
          {/* Add more buttons if needed */}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
