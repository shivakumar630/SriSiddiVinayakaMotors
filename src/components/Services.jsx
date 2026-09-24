import React from "react";


const services = [

  {
    icon: "🛢️",
    title: "Oil Change",
    description:
      "Premium engine oil replacement for smooth and reliable performance.",
    price: 2000
  },

  {
    icon: "🚿",
    title: "Car Wash",
    description:
      "Professional exterior and interior cleaning for a fresh finish.",
    price: 500
  },

  {
    icon: "🔧",
    title: "Engine Repair",
    description:
      "Complete engine inspection, diagnostics and repair service.",
    price: 8000
  },

  {
    icon: "🔋",
    title: "Battery Check",
    description:
      "Battery health inspection and electrical system check.",
    price: 1500
  },

  {
    icon: "✨",
    title: "Ceramic Coating",
    description:
      "Premium paint protection with a deep, glossy finish.",
    price: 12000
  }

];


function Services() {

  return (

    <section
      id="services"
      className="section services-section"
    >

      <div className="section-heading">

        <div className="section-label">
          WHAT WE DO
        </div>

        <h2>
          Premium Car Services
        </h2>

        <p>
          Professional automotive care designed
          to keep your vehicle performing at its best.
        </p>

      </div>


      <div className="services-grid">

        {services.map(
          (service, index) => (

            <div
              className="service-card"
              key={service.title}
              style={{
                "--delay":
                  `${index * 0.08}s`
              }}
            >

              <div className="service-number">
                0{index + 1}
              </div>


              <div className="service-icon">
                {service.icon}
              </div>


              <h3>
                {service.title}
              </h3>


              <p>
                {service.description}
              </p>


              <div className="service-card-bottom">

                <strong>
                  ₹
                  {service.price.toLocaleString(
                    "en-IN"
                  )}
                </strong>

                <a href="#booking">
                  Book →
                </a>

              </div>

            </div>

          )
        )}

      </div>

    </section>

  );
}


export default Services;