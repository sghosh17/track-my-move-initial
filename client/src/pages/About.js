import React from "react";
import "../aboutUs.css";

const About = () => {
  return (
    <section className="page-section text-black text-center mb-0">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 mt-12">
            <img src="/logo.png" alt="Track My Move" className="mt-4 mb-4" />
            <h2 className="aboutus-header">Track My Move</h2>
            <p className="aboutus-content ">
              Address Line 1
              <br />
              Address Line 2
              <br />
              City
              <br />
              Postcode
              <br />
            </p>

            <p className="aboutus-content ">
              Email
              <br />
              Phone
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
