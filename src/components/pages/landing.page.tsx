import React from "react";
import About from "../UI/landingpage/About";
import MyCarousel from "../UI/landingpage/carousel";
import Contact from "../UI/landingpage/contact";
import Footer from "../UI/landingpage/footer";
import Services from "../UI/landingpage/services";
const Landingpage = () => {
  return (
    <React.Fragment>
      <MyCarousel />
      {/* <!--- About Section--> */}
      <About />
      {/* <!-- Contact Section--> */}
      <Services />
      <Contact />
      <Footer />
    </React.Fragment>
  );
};

export default Landingpage;
