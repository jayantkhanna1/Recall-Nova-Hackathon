import React, { useState } from "react";
import LandingPageImages from "../../assets/LandingPageImages";
import Brand from "../../assets/brand";
import { scroller } from "react-scroll";
import Menu from "../../modals/LandingPageModals/Menu/Menu";
import MobileSidebar from "../SideBar/MobileSidebar";
import AuthenticationModals from "../../modals/AuthenticationModals";
const MobileNavbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const user = JSON.parse(localStorage.getItem("userData"));
  const [showMenu2, setShowMenu2] = useState(false);

  const handleClick = () => {
    if (
      window.location.pathname === "/" ||
      window.location.pathname === "terms-of-use" ||
      window.location.pathname === "privacy-policy"
    ) {
      
        setShowMenu(!showMenu);
      
    } else {
      if (user && window.location.pathname === "/binlocations") {

        setShowMenu2(!showMenu2);
      }
      else{
        setShowMenu(!showMenu);
      }
    }
  };
  const handleClickScroll = (section) => {
    scroller.scrollTo(section, {
      smooth: true,
      offset: -100,
      duration: 1200,
    });
  };
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  return (
    <div className="recall-mobile-nav">
      <AuthenticationModals.LoginModal
        open={showLoginModal}
        handleClose={() => setShowLoginModal(false)}
      />
      <AuthenticationModals.SignupModal
        open={showSignupModal}
        handleClose={() => setShowSignupModal(false)}
      />
      <div
        className={
          showMenu2
            ? "mobile-sidebar-container open-sidebar"
            : "mobile-sidebar-container"
        }
      >
        <MobileSidebar />
      </div>
      <Menu
        open={showMenu}
        handleClose={() => setShowMenu(false)}
        handleClick={handleClickScroll}
        setShowLoginModal={setShowLoginModal}
        setShowSignupModal={setShowSignupModal}
      />
      <div className="recall-mobile-nav-logo">
        <img src={Brand.NavbarLogo} alt="" />
      </div>
      <div onClick={handleClick} className="recall-mobile-nav-menu">
        <img src={LandingPageImages.Menu} alt="" />
      </div>
    </div>
  );
};

export default MobileNavbar;
