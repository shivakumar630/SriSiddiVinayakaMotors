import React from "react";


function Home() {

  return (

    <section
      id="home"
      className="home-section"
    >

      <div className="home-overlay"></div>


      <div className="home-content">

        <div className="premium-badge">
          PREMIUM AUTOMOTIVE CARE
        </div>


        <h1>

          YOUR CAR.

          <br />

          OUR

          <span>
            PASSION.
          </span>

        </h1>


        <p>

          Premium car servicing, maintenance
          and detailing delivered with
          precision and care.

        </p>


        <div className="home-buttons">

          <a
            href="#booking"
            className="primary-button"
          >
            Book a Service
          </a>


          <a
            href="#services"
            className="secondary-button"
          >
            Explore Services
          </a>

        </div>


        <div className="home-stats">

          <div>

            <strong>
              500+
            </strong>

            <span>
              Cars Serviced
            </span>

          </div>


          <div>

            <strong>
              5+
            </strong>

            <span>
              Premium Services
            </span>

          </div>


          <div>

            <strong>
              100%
            </strong>

            <span>
              Customer Focus
            </span>

          </div>

        </div>

      </div>


      <div className="scroll-indicator">

        <span></span>

        SCROLL TO EXPLORE

      </div>

    </section>

  );
}


export default Home;