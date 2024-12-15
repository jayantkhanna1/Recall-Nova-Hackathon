import React, { useState } from "react";
import AuthenticationModals from "../../modals/AuthenticationModals";
import Brand from "../../assets/brand";
import { useNavigate } from "react-router-dom";
const Navbar = (props) => {
  const user = JSON.parse(localStorage.getItem("userData"));
  console.log(user);
  const menuItems = [
    {
      title: "Home",
      scroll: "home",
    },
    {
      title: "What's recall",
      scroll: "whatsrecall",
    },
    {
      title: "How it works",
      scroll: "howitworks",
    },
    {
      title: "Our Plans",
      scroll: "ourplans",
    },
    {
      title: "Bin Locations",
      navigate: "/binlocations",
    },
    {
      title: "Purpose",
      scroll: "purpose",
    },
    {
      title: "Contact Us",
      scroll: "contactus",
    },
    {
      title: "Store",
      link: "https://store.recalluae.com",
    },
  ];

  // state for login and signup modals

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const navigate = useNavigate();

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

      <div className="recall-navbar">
        <div
          onClick={() => {
            navigate("/");
          }}
          className="recall-navbar-logo"
        >
          <img src={Brand.NavbarLogo} alt="" />
        </div>
        <div className="recall-navbar-links">
          {menuItems.map((item) => {
            return (
              <p
                onClick={() => {
                  if (item.navigate) navigate(item.navigate);
                  if (item.link) window.open(item.link, "_blank");
                  if (item.scroll) {
                    if (window.location.pathname === "/") {
                      props.handleClick(item.scroll);
                    } else {
                      navigate("/");
                      setTimeout(() => {
                        props.handleClick(item.scroll);
                      }, 1000);
                    }
                  }
                }}
              >
                {item.title}
              </p>
            );
          })}
        </div>
        {user ? (
          <div className="navbar-cta">
            {/* <button onClick={() => setShowLoginModal(true)}>Log in</button> */}
            <button
              onClick={() => {navigate("/dashboard")}}
              // className="primary"
            >
             Go to Dashboard
            </button>
          </div>
        ) : (
          <div className="navbar-cta">
            <button onClick={() => setShowLoginModal(true)}>Log in</button>
            <button
              onClick={() => setShowSignupModal(true)}
              className="primary"
            >
              Sign up
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
