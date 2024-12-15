import React from "react";
import Box from "@mui/material/Box";
// import { useNavigate } fom "react-router-dom";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import NavbarIcons from "../../../assets/NavbarIcons";

const style = {
  position: "absolute",
  top: "40%",
  left: "60%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  border: "none",
  borderRadius: "15px",
  width: "68%",
  p: 2.4,
};
const Menu = ({
  open,
  handleClose,
  handleClick,
  setShowLoginModal,
  setShowSignupModal,
}) => {
  const navigate = useNavigate();
  const menuitems = [
    {
      name: "Home",
      icon: NavbarIcons.Home,
      scroll: "home",
    },
    {
      name: "What's Recall",
      icon: NavbarIcons.What,
      scroll: "whatsrecall",
    },
    {
      name: "How it Works",
      icon: NavbarIcons.Settings,
      scroll: "howitworks",
    },
    {
      name: "Our Plans",
      icon: NavbarIcons.Plan,
      scroll: "ourplans",
    },
    {
      name: "Bin Locations",
      icon: NavbarIcons.Bin,
      navigate: "/binlocations",
    },
    {
      name: "Purpose",
      icon: NavbarIcons.Purpose,
      scroll: "purpose",
    },
    {
      name: "Contact Us",
      icon: NavbarIcons.Contact,
      scroll: "contactus",
    },

    {
      name: "Store",
      icon: NavbarIcons.Store,
      link: "https://store.recalluae.com",
    },
  ];

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="menu-modal">
            <p>Navigation</p>
            <div className="menu-links">
              {menuitems.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      if (item.navigate) navigate(item.navigate);
                      if (item.link) window.open(item.link, "_blank");
                      if (item.scroll) {
                        if (window.location.pathname === "/") {
                          handleClick(item.scroll);
                        } else {
                          navigate("/");
                          setTimeout(() => {
                            handleClick(item.scroll);
                          }, 1000);
                        }
                      }
                      handleClose();
                    }}
                    className="menu-links-item"
                  >
                    <div className="menu-links-item-icon">
                      <img src={item.icon} alt="" />
                    </div>
                    <div className="menu-links-item-text">
                      <p>{item.name}</p>
                    </div>
                  </div>
                );
              })}
              <div className="menu-buttons">
                <button
                  className="secondary"
                  onClick={() => {
                    setShowSignupModal(true);
                    setTimeout(() => {}, 1000);
                  }}
                >
                  Sign-up
                </button>
                <button
                  onClick={() => {
                    setShowLoginModal(true);

                    handleClose();
                  }}
                >
                  Log-in
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Menu;
