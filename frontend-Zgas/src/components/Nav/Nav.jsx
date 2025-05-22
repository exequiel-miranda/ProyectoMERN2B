import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "../Nav/nav.css";

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const menuItems = [
    { path: "/", label: "INICIO" },
    { path: "/employee", label: "EMPLEADOS" },
    { path: "/products", label: "PRODUCTOS" },
    { path: "/branches", label: "BRANCHES" },
  ];

  return (
    <nav className="navbar navbary navbar-expand-lg">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <Link className="navbar-brand itemnav" to="/">
          <img src="/zgaslogo-removebg-preview.png" alt="inicio" width="100" />
        </Link>

        <button
          className={`navbar-toggler ${menuOpen ? "open" : ""}`}
          type="button"
          aria-controls="navbarNav"
          aria-expanded={menuOpen}
          aria-label="Alternar navegación"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse justify-content-end ${
            menuOpen ? "show" : ""
          }`}
          id="navbarNav"
        >
          <ul className="navbar-nav d-flex align-items-center">
            {menuItems.map(({ path, label }) => (
              <li className="nav-item" key={path}>
                <NavLink
                  className={({ isActive }) =>
                    `nav-link itemnav ${isActive ? "active" : ""}`
                  }
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  end={path === "/"} // Para que solo en "/" se active INICIO
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;



