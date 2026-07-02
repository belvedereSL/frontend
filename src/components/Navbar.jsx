import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import logo from "../assets/Logo/logo.png";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "News", path: "/news" },
  ];

  const location = useLocation();
  const pathname = location.pathname;
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 1. Create a ref to attach to the main <nav> container
  const navRef = useRef(null);

  // Combined event listeners for scroll and outside clicks
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // 2. Close the menu if a click happens outside the nav container
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        navRef.current &&
        !navRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]); // Dependency array includes menuOpen to track state correctly

  return (
    // 3. Attach the ref to the parent nav element
    <nav ref={navRef} className={`navbar ${scrolled ? "is-scrolled" : ""}`}>
      <div className="nav-container">
        <div className="Logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <div className="nav-elements">
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={
                    pathname === item.path ? "nav-link active" : "nav-link"
                  }
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="cta-btn">
            <NavLink to="/contact" className="cta">
              Contact Us
            </NavLink>
          </div>

          <button
            className="nav-burger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={
                menuOpen ? "nav-burgerLineTopOpen" : "nav-burgerLineTop"
              }
            />
            <span
              className={
                menuOpen ? "nav-burgerLineMidOpen" : "nav-burgerLineMid"
              }
            />
            <span
              className={
                menuOpen ? "nav-burgerLineBotOpen" : "nav-burgerLineBot"
              }
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nav-mobileMenu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
          >
            {navItems.map(({ name, path }, i) => (
              <motion.div
                key={path}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {/* 4. Added onClick to close menu when a mobile link is tapped */}
                <NavLink
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `nav-mobileLink ${isActive ? "nav-mobileLinkActive" : ""}`
                  }
                >
                  {name}
                </NavLink>
              </motion.div>
            ))}
            <div className="nav-mobilecta-btn">
              {/* 5. Added onClick here as well */}
              <NavLink
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="nav-mobilecta"
              >
                Contact Us
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
