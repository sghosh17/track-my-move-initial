import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "../Footer/footer.css";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-100 mt-4 bg-secondary p-4 footer">
      <div className="container text-center mb-5">
        {location.pathname !== "/" && (
          <button className="btn btn-dark mb-3" onClick={() => navigate(-1)}>
            &larr; Go Back
          </button>
        )}

        <Link className="btn btn-lg btn-1 m-2" to="/contact">
          Contact Us
        </Link>
      </div>
      <div className="footer">
        <p>Copyright @2022 </p>
      </div>
    </footer>
  );
};

export default Footer;
