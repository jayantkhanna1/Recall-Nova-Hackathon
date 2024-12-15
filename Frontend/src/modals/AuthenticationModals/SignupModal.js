import React from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import AuthImages from "../../assets/AuthImages";
import Brand from "../../assets/brand";
import "../../styles/Modals/login.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 16,
  border: "none",
  borderRadius: 6,
  overflow: "scroll",
  height: window.innerWidth > 600 ? "80%" : "unset",
  minHeight: "80%",

  width: window.innerWidth > 600 ? "75%" : "90%",

  p: 0,
};
const SignupModal = ({ open, handleClose, setShowLoginModal }) => {
  const navigate = useNavigate();
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="recall-login-modal">
            <div className="recall-login-modal-left">
              <img src={AuthImages.LoginModal} alt="" />
              <div className="recall-login-modal-left-text">
                Join the Recall Squad and be a part of the revolution!
              </div>
            </div>
            <div className="recall-login-modal-right">
              <div className="recall-login-modal-logo">
                <img src={Brand.NavbarLogo} alt="" />
              </div>
              <div className="recall-login-modal-info">
                <h1>
                  Recycle with Recall - Together for a Sustainable Future.
                </h1>
                <div className="recall-login-modal-list">
                  <p>
                    <span> 🌎 Impactful Recycling :</span> Each can you recycle
                    contributes to a cleaner planet.
                  </p>
                  <p>
                    <span>🌎 Sustainable Recycling :</span> Make Eco
                    responsibility a habit,learn how you can be a part of
                    solution.
                  </p>
                </div>
              </div>
              <div className="recall-login-modal-buttons">
                <button
                  onClick={() => {
                    navigate("/signup/individual");
                    handleClose();
                  }}
                  className="secondary"
                >
                  Signup as individual
                </button>
                <button
                  onClick={() => {
                    navigate("/signup/business");
                    handleClose();
                  }}
                >
                  Signup as business
                </button>

                <p>
                  <span
                    onClick={() => {
                      // navigate("/login/business");
                      setShowLoginModal(true);
                      handleClose();
                    }}
                  >
                    {" "}
                    Already a user?
                  </span>{" "}
                  Login to access your account
                </p>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default SignupModal;
