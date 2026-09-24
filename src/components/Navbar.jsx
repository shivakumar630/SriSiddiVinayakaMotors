import React, { useState } from "react";


function Navbar() {

  const [menuOpen, setMenuOpen] =
    useState(false);


  const closeMenu = () => {
    setMenuOpen(false);
  };


  return (

    <header className="navbar">

      <div className="navbar-container">


        <a
          href="#home"
          className="brand"
          onClick={closeMenu}
        >

          <div className="brand-logo">
            SVM
          </div>

          <div className="brand-text">

            <strong>
              SRI SIDDI VINAYAKA
            </strong>

            <span>
              MOTORS
            </span>

          </div>

        </a>


        <nav
          className={
            menuOpen
              ? "nav-links mobile-open"
              : "nav-links"
          }
        >

          <a
            href="#home"
            onClick={closeMenu}
          >
            Home
          </a>

          <a
            href="#services"
            onClick={closeMenu}
          >
            Services
          </a>

          <a
            href="#about"
            onClick={closeMenu}
          >
            About
          </a>

          <a
            href="#offers"
            onClick={closeMenu}
          >
            Offers
          </a>

          <a
            href="#booking"
            onClick={closeMenu}
          >
            Booking
          </a>

          <a
            href="#contact"
            onClick={closeMenu}
          >
            Contact
          </a>

        </nav>


        <a
          href="#booking"
          className="nav-book-button"
          onClick={closeMenu}
        >
          Book Now
        </a>


        <button
          className="menu-button"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          aria-label="Toggle menu"
        >
          ☰
        </button>

      </div>

    </header>

  );
}


export default Navbar;