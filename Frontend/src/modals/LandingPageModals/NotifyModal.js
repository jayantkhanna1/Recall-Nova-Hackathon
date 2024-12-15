import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "../modals.css";
import DashboardIcons from "../../assets/DashboardIcons";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  border: "none",
  borderRadius: "17px",
  focus: "none",
  outline: "none",
  width: window.innerWidth > 600 ? "500px" : "90%",
  oveflow: "hidden",
  p: "0",
};
const NotifyModal = ({ open, handleClose }) => {
  const [submittedEmail, setSubmittedEmail] = useState(false);
  const [email, setEmail] = useState("");
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="notify-modal">
            <div className="notify-sub">
              <div className="line"></div>
              {submittedEmail ? "Thank you! 😁" : "App Coming Soon"}
            </div>
            <div className="logo-bg">
              <img src={DashboardIcons.LogoBg} alt="" />
            </div>
            {submittedEmail ? (
              <h1>We will notify you when we launch 🚀.</h1>
            ) : (
              <h1>
                Get Notified <br />
                When we Launch
              </h1>
            )}
            {submittedEmail ? (
              <>
                <div className="modal-button">
                  <button
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    Continue with Recall
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="email-input">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    onClick={() => {
                      // Submit email logic here
                      setSubmittedEmail(true); // Set submittedEmail to true after submission
                    }}
                  >
                    Notify Me
                  </button>
                </div>
              </>
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default NotifyModal;
