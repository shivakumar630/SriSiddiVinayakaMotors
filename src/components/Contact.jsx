import React from "react";


function Contact() {

  return (

    <section
      id="contact"
      className="section contact-section"
    >

      <div className="section-heading">

        <div className="section-label">
          GET IN TOUCH
        </div>

        <h2>
          Visit Sri Siddi Vinayaka Motors
        </h2>

        <p>
          Have a question? Contact us or
          book your next service appointment.
        </p>

      </div>


      <div className="contact-grid">


        <div className="contact-card">

          <div className="contact-icon">
            📍
          </div>

          <span>
            LOCATION
          </span>

          <h3>
            Bulkapur Gate,Hyderabad Road, Rangareddy Dist
          </h3>

          <p>
            Sri Siddi Vinayaka Motors
          </p>

        </div>


        <div className="contact-card">

          <div className="contact-icon">
            📞
          </div>

          <span>
            PHONE
          </span>

          <h3>
            Garage Support
          </h3>

          <p>
           <b> M.Shekar -- 6281080097</b><br></br>
            <b>K.Mahesh -- 9492928961</b>
          </p>

        </div>


        <div className="contact-card">

          <div className="contact-icon">
            🕘
          </div>

          <span>
            WORKING HOURS
          </span>

          <h3>
            9:30 AM - 6:00 PM
          </h3>

          <p>
            Monday - Sunday
          </p>

        </div>


      </div>


      <div className="contact-cta">

        <div>

          <span>
            READY TO SERVICE YOUR CAR?
          </span>

          <h3>
            Book your appointment today.
          </h3>

        </div>


        <a
          href="#booking"
          className="primary-button"
        >
          Book Service →
        </a>

      </div>

    </section>

  );
}


export default Contact;