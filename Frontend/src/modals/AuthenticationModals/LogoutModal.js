import React from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal"; 
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  border: "none",
  borderRadius: 4,
  width: window.innerWidth > 600 ? "500px" : "80%",
  p: 4,
};
const LogoutModal = ({ open, handleClose }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    if (localStorage.getItem("userData")) {
      localStorage.removeItem("userData");
      navigate("/");
      handleClose();
    } else if (localStorage.getItem("guest")) {
      localStorage.removeItem("guest");
      navigate("/");
      handleClose();
    } else if (localStorage.getItem("recallAdmin")) {
      localStorage.removeItem("recallAdmin");
      navigate("/recall-admin-page-login");
      handleClose();
    }
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="logout-modal">
            <h1>Are you sure you want to log out?</h1>
            <div className="logout-btn">
              <button
                onClick={() => {
                  handleLogout();
                }}
              >
                Log Out
              </button>
              <button
                onClick={() => {
                  handleClose();
                }}
                className="secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default LogoutModal;
