import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import OTPInput from "otp-input-react";
import { errorToast, successToast } from ".././../utils/toast";
import Brand from "../../assets/brand";
import "../../styles/Modals/login.css"
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: "40px",
  border: "none",
  borderRadius: "28px",
  width: "450px",
  p: "30px",
};
const VerifyOtp = ({ active, setActive, otpvalue, open, handleClose }) => {
  const [OTP, setOTP] = useState("");
  const handleSubmit = () => {
    if (active === 0) {
      console.log("OTP", OTP, typeof OTP);
      console.log("otpvalue", otpvalue, typeof otpvalue);
      if (OTP === otpvalue.toString()) {
        successToast("OTP Verified");
        handleClose();
        setActive(1);
      } else {
        errorToast("Invalid OTP");
        setOTP("");
      }
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
          <div className="recall-store-otp">
            <div className="recall-store-otp-logo">
              <img src={Brand.ModalLogo} alt="" />
            </div>
            <div className="recall-store-otp-header">
              <h1>Verify Your Email Id</h1>
              <p>
                Enter the 4-digit code that was sent to <br /> your email
              </p>
            </div>
            <div className="recall-store-otp-input">
              <OTPInput
                value={OTP}
                onChange={setOTP}
                OTPLength={4}
                otpType="number"
                disabled={false}
              />
            </div>
            <div className="recall-store-otp-button">
              <button
                onClick={() => {
                  handleSubmit();
                  handleClose();
                }}
              >
                Verify OTP
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default VerifyOtp;
