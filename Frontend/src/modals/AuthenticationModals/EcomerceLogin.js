import React from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Icon from "../assets/icon.svg";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  border: "none",
  borderRadius: 2,
  width: "500px",
  p: 3,
};
const EcomerceLogin = ({ open, handleClose }) => {
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
          <div className="ecommerce-modal">
            <div className="icon-recall">
              <img src={Icon} alt="" />
            </div>
            <h1>
              Get Started with <span> Recall</span>
            </h1>
            <p>
              Join the recycling movement and start earning rewards for your
              efforts!
            </p>
            <div className="ecommerce-modal-btns">
              <button
                onClick={() => {
                  navigate("/signup");
                  handleClose();
                }}
                className="ecommerce-secondary"
              >
                Signup for Recall
              </button>
              <button
                onClick={() => {
                  handleClose();
                  localStorage.setItem("guest", true);
                }}
              >
                Continue as a Guest
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default EcomerceLogin;
