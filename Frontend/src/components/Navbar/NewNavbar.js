import React, { useState, useEffect } from "react";
import AuthenticationModals from "../../modals/AuthenticationModals";
import { useLocation } from "react-router-dom";
import LandingPageImages from "../../assets/LandingPageImages";
const Navbar = (props) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 1000);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const [open2, setOpen2] = useState(false);

  const handleClose2 = () => {
    setOpen2(false);
  };

  const [showNavbar, setShowNavbar] = useState(true);
  useEffect(() => {
    const hideNavbarOnLogin = [
      "/login/individual",
      "/signup/business",
      "/signup/individual",
      "/login/business",
      "/profile",
    ];
    if (hideNavbarOnLogin.includes(location.pathname)) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [location.pathname]);

  const menuItems = [
    {
      title: "About Us",
      scroll: "about-us-container",
    },
    {
      title: "How to",
      scroll: "how-to-container",
    },
    {
      title: "Purpose",
      scroll: "principles-container",
    },
    {
      title: "Contact Us",
      scroll: "contact-us-container",
    },
  ];
  return (
    <>
      {!showNavbar ? null : (
        <div className="nav-wrap">
          <AuthenticationModals.SignupModal
            open={open}
            handleClose={handleClose}
          />
          <AuthenticationModals.LoginModal
            open={open2}
            handleClose={handleClose2}
          />
          <div className={`navbar ${isScrolled ? "scrolled" : ""}`}>
            <div className="nav-logo">
              {isScrolled ? (
                <img src={LandingPageImages.NavlogoBlack} alt="" />
              ) : (
                <img src={LandingPageImages.NavlogoWhite} alt="" />
              )}
            </div>
            <div className="nav-links">
              <>
                {menuItems.map((item) => {
                  return (
                    <p
                      onClick={() => {
                        props.handleClick(item.scroll);
                      }}
                    >
                      {item.title}
                    </p>
                  );
                })}
              </>
            </div>
            <div className="nav-btns">
              <div className="cart"></div>
              <>
                <button
                  onClick={() => {
                    setOpen2(true);
                  }}
                  className=" nav-btn | tertiary-btn"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setOpen(true);
                  }}
                  className=" nav-btn | primary-btn"
                >
                  Signup
                </button>
              </>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
