import React, { useState } from "react";
import LandingPageImages from "../../assets/LandingPageImages";
import Brand from "../../assets/brand";
import { useNavigate } from "react-router-dom";
import AuthenticationModals from "../../modals/AuthenticationModals";
const Footer = (props) => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  return (
    <>
      {showLoginModal && (
        <AuthenticationModals.LoginModal
          open={showLoginModal}
          setShowSignupModal={setShowSignupModal}
          handleClose={() => setShowLoginModal(false)}
        />
      )}
      {showSignupModal && (
        <AuthenticationModals.SignupModal
          open={showSignupModal}
          setShowLoginModal={setShowLoginModal}
          handleClose={() => setShowSignupModal(false)}
        />
      )}
      <div className="recall-landing-footer">
        <div className="footer-signup">
          <div className="footer-signup-left">
            <div className="recall-landing-page-section-1-text-large">
              Sign-up today!
            </div>
          </div>
          <div className="footer-signup-right">
            <div className="footer-sgnup-cta">
              <button
                onClick={() => {
                  setShowSignupModal(true);
                }}
              >
                Get Started
              </button>
              <p
                onClick={() => {
                  props.handleClick("whatsrecall");
                }}
              >
                Learn More <img src={LandingPageImages.Arrow} alt="" />
              </p>
            </div>
          </div>
        </div>
        <div className="footer-content">
          <div className="footer-content-left">
            <img src={Brand.FooterLogo} alt="" />
            <p className="recall-landing-page-section-1-text-medium">
              Recall is an initiative of S2Loop. Inc.
            </p>
            <div className="footer-sgnup-cta | footer-cta">
              <button
                onClick={() => {
                  setShowSignupModal(true);
                }}
              >
                Get Started
              </button>
            </div>
            <div className="privacy-links">
              <a href="https://recalluae.com/privacy-policy">Privacy Policy</a>
              <a href="https://recalluae.com/terms-of-use">Terms of Use</a>
            </div>
            <div className="copyright">
              <p>Copyright © 2023 All Rights Reserved by RecallUAE</p>
            </div>
          </div>
          <div className="footer-content-right">
            <div className="footer-content-right-links">
              <div className="footer-content-right-links-item">
                <div className="footer-content-right-links-item-header">
                  About Recall
                </div>
                <div className="footer-content-right-links-item-links">
                  <p
                    onClick={() => {
                      props.handleClick("whatsrecall");
                    }}
                  >
                    What's Recall
                  </p>
                  <p
                    onClick={() => {
                      props.handleClick("ourplans");
                    }}
                  >
                    Our Plans
                  </p>
                  <p
                    onClick={() => {
                      props.handleClick("purpose");
                    }}
                  >
                    Our Core Principles
                  </p>
                  <p
                    onClick={() => {
                      props.handleClick("contactus");
                    }}
                  >
                    Contact Us
                  </p>
                  <p
                    onClick={() => {
                      props.handleClick("faq");
                    }}
                  >
                    Recall FAQ
                  </p>
                </div>
              </div>
              <div className="footer-content-right-links-item">
                <div className="footer-content-right-links-item-header">
                  Recall Store
                </div>
                <div className="footer-content-right-links-item-links">
                  <p
                    onClick={() => {
                      window.open("https://store.recalluae.com");
                    }}
                  >
                    Visit Recall Store
                  </p>
                  <p
                    onClick={() => {
                      window.open("https://store.recalluae.com");
                    }}
                  >
                    {" "}
                    Recall Product Categories
                  </p>
                  <p
                    onClick={() => {
                      window.open("https://store.recalluae.com/all-products");
                    }}
                  >
                    All Products
                  </p>
                  <p
                    onClick={() => {
                      window.open("https://store.recalluae.com");
                    }}
                  >
                    Return Policy
                  </p>
                  <p
                    onClick={() => {
                      window.open("https://www.recalluae.com/terms-of-use");
                    }}
                  >
                    Terms of use
                  </p>
                </div>
              </div>
            </div>
            <div className="footer-content-right-social">
              <img
                onClick={() => {
                  window.open("https://www.facebook.com/recall.uae");
                }}
                src={LandingPageImages.Facebook}
                alt=""
              />
              <img
                onClick={() => {
                  window.open("https://twitter.com/recalluae");
                }}
                src={LandingPageImages.Twitter}
                alt=""
              />
              <img
                onClick={() => {
                  window.open("https://instagram.com/recall.uae");
                }}
                src={LandingPageImages.Instagram}
                alt=""
              />
              <img
                onClick={() => {
                  window.open("https://www.linkedin.com/company/recalluae/");
                }}
                src={LandingPageImages.Linkedin}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
