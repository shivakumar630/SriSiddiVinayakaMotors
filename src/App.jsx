import React from "react";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Services from "./components/Services";
import About from "./components/About";
import Offers from "./components/Offers";
import Booking from "./components/Booking";
import Contact from "./components/Contact";
import Footer from "./components/Footer";


function App() {

  return (

    <div className="app">

      <Navbar />

      <main>

        <Home />

        <Services />

        <About />

        <Offers />

        <Booking />

        <Contact />

      </main>

      <Footer />

    </div>

  );
}


export default App;