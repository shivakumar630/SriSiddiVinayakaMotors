import React from "react";


const offers = [

  {
    tag: "POPULAR",
    title: "Complete Care",
    description:
      "Oil Change + Car Wash",
    price: "₹2,500"
  },

  {
    tag: "PREMIUM",
    title: "Shine Package",
    description:
      "Car Wash + Ceramic Coating",
    price: "₹12,500",
    featured: true
  },

  {
    tag: "ESSENTIAL",
    title: "Essential Check",
    description:
      "Battery Check + Oil Change",
    price: "₹3,500"
  }

];


function Offers() {

  return (

    <section
      id="offers"
      className="section offers-section"
    >

      <div className="section-heading">

        <div className="section-label">
          SPECIAL PACKAGES
        </div>

        <h2>
          Drive More. Spend Less.
        </h2>

        <p>
          Take advantage of our selected
          automotive service packages.
        </p>

      </div>


      <div className="offers-grid">

        {offers.map((offer) => (

          <div
            key={offer.title}
            className={
              offer.featured
                ? "offer-card featured"
                : "offer-card"
            }
          >

            <div className="offer-tag">
              {offer.tag}
            </div>


            <div className="offer-content">

              <h3>
                {offer.title}
              </h3>

              <p>
                {offer.description}
              </p>

              <strong>
                {offer.price}
              </strong>

            </div>


            <a
              href="#booking"
              className="offer-button"
            >
              Book Package
            </a>

          </div>

        ))}

      </div>

    </section>

  );
}


export default Offers;