import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "tailwindcss/tailwind.css";
import "./slidebar.css";
import { FaHome, FaSistrix, FaUser, FaCog, FaBars } from "react-icons/fa";

function Slidebar() {
  const [showSidebar, setShowSidebar] = useState(true); // establecer en true por defecto
  const screenWidth = useRef(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      screenWidth.current = window.innerWidth;
      setShowSidebar(screenWidth.current >= 1600);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <button
        className="hide-sidebar-button"
        onClick={() => setShowSidebar(!showSidebar)}
        style={{ display: screenWidth.current < 1600 ? "block" : "none" }}
      >
        {showSidebar ? <FaBars className="text-white"/> : <FaBars />}
      </button>
      <div className={`menuIzq p-4 ${showSidebar ? "" : "hidden"}`}>
        <span>
          <Link
            to="#"
            className="link list-group-item font-weight-bold mb-3 p-3 d-flex align-items-center"
          >
            <FaHome style={{ fontSize: "24px" }} />
            <span style={{ paddingLeft: "10px" }}>Inicio</span>
          </Link>
        </span>
        <span>
          <Link
            to="#"
            className="link list-group-item font-weight-bold mb-3 p-3 d-flex align-items-center"
          >
            <FaSistrix style={{ fontSize: "24px" }} />
            <span style={{ paddingLeft: "10px" }}>Explorar</span>
          </Link>
        </span>
        <span>
          <Link
            to="#"
            className="link list-group-item font-weight-bold mb-3 p-3 d-flex align-items-center"
          >
            <FaUser style={{ fontSize: "24px" }} />
            <span style={{ paddingLeft: "10px" }}>Perfil</span>
          </Link>
        </span>
        <span>
          <Link
            to="#"
            className="link list-group-item font-weight-bold mb-3 p-3 d-flex align-items-center"
          >
            <FaCog style={{ fontSize: "24px" }} />
            <span style={{ paddingLeft: "10px" }}>Configuración</span>
          </Link>
        </span>
      </div>
      <style>
        {`
          .hidden {
            display: none;
          }
        `}
      </style>
    </>
  );
}

export default Slidebar;