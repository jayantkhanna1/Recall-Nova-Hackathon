import React, { useState, useEffect } from "react";
import SideBarIcons from "../../assets/SideBarIcons";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LogoutModal from "../../modals/AuthenticationModals/LogoutModal";
import brand from "../../assets/brand";
const SideBar = () => {
  const location = useLocation();
  const [show, setshow] = useState(true);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (
      location.pathname === "/" ||
      location.pathname === "/login/business" ||
      location.pathname === "/signup/individual" ||
      location.pathname === "/login/individual" ||
      location.pathname === "/signup/business" ||
      location.pathname === "/terms-of-use" ||
      location.pathname === "/privacy-policy" || 
      location.pathname === "/binlocations"
    ) {
      setshow(false);
    } else {
      setshow(true);
    }
  }, [location]);
  const navigate = useNavigate();
  const sidebarData = {
    navigation: [
      {
        name: "Dashboard",
        icon: SideBarIcons.Home,
        whiteicon: SideBarIcons.WhiteHome,
        path: "/dashboard",
        nonvistible: false,
      },
      {
        name: "Recall Store",
        icon: SideBarIcons.Store,
        whiteicon: SideBarIcons.WhiteStore,
        nonvistible: false,
        path: "/ecommerce",
        link: "https://store.recalluae.com",
      },
      {
        name: "Contact Recall",
        icon: SideBarIcons.Contact,
        whiteicon: SideBarIcons.WhiteContact,
        nonvistible: false,
        path: "/contact",
      },
      {
        name: "Locations",
        icon: SideBarIcons.LocationIcon,
        whiteicon: SideBarIcons.WhiteLocation,
        nonvistible: false,
        path: "/binlocations",
      },
    ],
    profile: [
      {
        name: "My Profile",
        icon: SideBarIcons.Profile,
        whiteicon: SideBarIcons.WhiteProfile,
        nonvistible: false,
        path: "/profile",
      },
      {
        name: "Logout",
        icon: SideBarIcons.Logout,
        whiteicon: SideBarIcons.Logout,
        nonvistible: true,
        path: "",
      },
    ],
  };
  return (
    <>
      <LogoutModal open={open} handleClose={handleClose} />
      {show && (
        <div className="sidebar">
          <div className="sidebar-logo">
            <img src={brand.Logo} alt="" />
          </div>

          <>
            <div className="sidebar-navigation | sidebar-data">
              <p>Navigation</p>
              <div className="sidebar-navigation-list">
                {sidebarData.navigation.map((item, index) => {
                  return (
                    <div
                      className={`sidebar-navigation-item ${
                        (location.pathname === item.path &&
                          "sidebar-navigation-item-active") ||
                        ""
                      }`}
                      onMouseEnter={(e) => {
                        e.currentTarget.classList.add(
                          "sidebar-navigation-item-hovered"
                        );
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.classList.remove(
                          "sidebar-navigation-item-hovered"
                        );
                      }}
                      onClick={() => {
                        if (item.link) {
                          window.open(item.link, "_blank"); // Open link in new tab/window
                        } else {
                          navigate(item.path);
                        }
                      }}
                    >
                      <div className="sidebar-navigation-item-img">
                        <img
                          src={
                            location.pathname === item.path
                              ? item.whiteicon
                              : item.icon
                          }
                          alt=""
                        />
                      </div>
                      <div className="sidebar-navigation-item-text">
                        {item.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="sidebar-profile | sidebar-data">
              <p>Profile</p>
              <div className="sidebar-profile-list">
                {sidebarData.profile.map((item, index) => {
                  return (
                    <div
                      className={`sidebar-navigation-item ${
                        (location.pathname === item.path &&
                          "sidebar-navigation-item-active") ||
                        ""
                      }`}
                      onMouseEnter={(e) => {
                        e.currentTarget.classList.add(
                          "sidebar-navigation-item-hovered"
                        );
                      }}
                      onClick={() => {
                        if (item.nonvistible) {
                          setOpen(true);
                        } else {
                          navigate(item.path);
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.classList.remove(
                          "sidebar-navigation-item-hovered"
                        );
                      }}
                    >
                      <div className="sidebar-navigation-item-img">
                        <img
                          src={
                            location.pathname === item.path
                              ? item.whiteicon
                              : item.icon
                          }
                          alt=""
                        />
                      </div>
                      <div className="sidebar-navigation-item-text">
                        {item.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        </div>
      )}
    </>
  );
};

export default SideBar;
