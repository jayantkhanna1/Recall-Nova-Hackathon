import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
const Footer = () => {
  const location = useLocation();
  const [show, setshow] = useState(true);
  useEffect(() => {
    if (
      location.pathname === "/" ||
      location.pathname === "/terms-and-conditions" ||
      location.pathname === "/privacy-policy"
    ) {
      setshow(true);
    } else {
      setshow(false);
    }
  }, [location]);
  const [showNavbar, setShowNavbar] = useState(true);
  useEffect(() => {
    const hideNavbarOnLogin = [
      "/login",
      "/signup",
      "/signup-business",
      "/login-business",
    ];
    if (hideNavbarOnLogin.includes(location.pathname)) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [location.pathname]);
  return (
    <>
      {show && (
        <>
          {!showNavbar ? null : (
            <div className="new-footer">
              <div className="new-footer-flex">
                <div className="new-footer-left">
                  <div className="new-footer-logo">
                    <h1>Recall</h1>
                    <p>
                      Recall is an easy and convenient way to recycle <br />{" "}
                      aluminium cans and contribute to a cleaner <br />{" "}
                      environment. Recycling aluminium cans has never <br />
                      been this simple and rewarding!
                    </p>
                    <button>Get Started</button>
                  </div>
                  <div className="terms-links">
                    <p>Terms of Service</p>
                    <p>Privacy Policy</p>
                    <p>Our Services</p>
                  </div>
                </div>
                <div className="new-footer-right">
                  <div className="new-footer-links">
                    <div className="new-footer-links-header">Company</div>
                    <div className="new-footer-links-links">
                      <p>About Us</p>
                      <p>Our Services</p>
                      <p>Our Team</p>
                      <p>Contact Us</p>
                      <p>Our Team</p>
                      <p>Contact Us</p>
                      <p>Our Team</p>
                    </div>
                  </div>
                  <div className="new-footer-links">
                    <div className="new-footer-links-header">Company</div>
                    <div className="new-footer-links-links">
                      <p>About Us</p>
                      <p>Our Services</p>
                      <p>Our Team</p>
                      <p>Contact Us</p>
                      <p>Our Team</p>
                    </div>
                  </div>
                  <div className="new-footer-links">
                    <div className="new-footer-links-header">Company</div>
                    <div className="new-footer-links-links">
                      <p>About Us</p>
                      <p>Our Services</p>
                      <p>Our Team</p>
                      <p>Contact Us</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="copyright">
                <p>Copyright © 2023 Recall, All Rights Reserved.</p>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Footer;
