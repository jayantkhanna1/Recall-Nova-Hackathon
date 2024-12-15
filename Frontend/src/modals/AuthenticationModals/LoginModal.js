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
  focus: "none",
  borderRadius: 6,
  overflow: "scroll",
  height: window.innerWidth > 600 ? "80%" : "unset",
  minHeight: "80%",

  width: window.innerWidth > 600 ? "75%" : "90%",
  p: 0,
};
const LoginModal = ({ open, handleClose, setShowSignupModal }) => {
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
              <img
                className="login-modal-laptop"
                src={AuthImages.LoginModal}
                alt=""
              />
              <img
                className="login-modal-phone"
                src={AuthImages.LoginModal2}
                alt=""
              />
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
                    navigate("/login/individual");
                    handleClose();
                  }}
                >
                  Login as individual
                </button>
                <button
                  onClick={() => {
                    navigate("/login/business");
                    handleClose();
                  }}
                  className="secondary"
                >
                  Login as business
                </button>
                <p>
                  <span
                    onClick={() => {
                      // navigate("/signup/business");
                      setShowSignupModal(true);
                      handleClose();
                    }}
                  >
                    {" "}
                    New here?
                  </span>{" "}
                  Join the Recall Movement!
                </p>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default LoginModal;
