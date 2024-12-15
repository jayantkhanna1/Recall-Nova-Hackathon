import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import DashboardIcons from "../../assets/DashboardIcons";
import SideBarIcons from "../../assets/SideBarIcons";
import LandingPageImages from "../../assets/LandingPageImages";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  border: "none",
  borderRadius: 2,
  maxWidth: "1000px",
  p: 4,
};
const RecallBadge = ({ open, handleClose }) => {
  const badges = [
    {
      id: 1,
      name: "Dhairya",
      email: "dhairyamarwah01@gmail.com",
      description: "You've saved enough energy to power 40 homes.",
      img: LandingPageImages.Badge,
    },
    {
      id: 2,
      name: "Dhairya",
      email: "dhairyamarwah01@gmail.com",
      description: "You've saved enough energy to power 40 homes.",
      img: LandingPageImages.Badge,
    },
    {
      id: 3,
      name: "Dhairya",
      email: "dhairyamarwah01@gmail.com",
      description: "You've saved enough energy to power 40 homes.",
      img: LandingPageImages.Badge,
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
          <div className="badge-header">Your Earned Badges : </div>
          <div className="recall-badges">
            {badges.map((badge, index) => {
              return (
                <div key={index} className="recall-badge">
                  <div className="recall-badge-logo">
                    <img src={SideBarIcons.Logo} alt="logo" />
                  </div>
                  <div className="recall-badge-user">
                    <img src={LandingPageImages.BadgeIcon} alt="" />
                    <div className="recall-badge-user-text">
                      <div className="recall-badge-user-text-name">{badge.name}</div>
                      <div className="recall-badge-user-text-email">{badge.email}</div>
                    </div>
                  </div>
                  <div className="recall-badge-img">
                    <img src={badge.img} alt="" />
                  </div>
                  <div className="recall-badge-desc">{badge.description}</div>
                </div>
              );
            })}
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default RecallBadge;
