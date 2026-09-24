import React from "react";


function Footer() {

  const currentYear =
    new Date().getFullYear();


  return (

    <footer className="footer">

      <div className="footer-top">


        <div className="footer-brand">

          <div className="footer-logo">
            SVM
          </div>

          <div>

            <strong>
              SRI SIDDI VINAYAKA
            </strong>

            <span>
              MOTORS
            </span>

          </div>

        </div>


        <div className="footer-description">

          Premium automotive service,
          maintenance and detailing.

        </div>


        <div className="footer-links">

          <a href="#home">
            Home
          </a>

          <a href="#services">
            Services
          </a>

          <a href="#booking">
            Booking
          </a>

          <a href="#contact">
            Contact
          </a>

        </div>

      </div>


      <div className="footer-bottom">

        <p>
          © {currentYear}
          {" "}
          Sri Siddi Vinayaka Motors.
          All Rights Reserved.
        </p>

        <p>
          Premium Car Care
        </p>

      </div>

    </footer>

  );
}


export default Footer;