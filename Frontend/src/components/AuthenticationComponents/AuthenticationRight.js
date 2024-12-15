import React from "react";

const AuthenticationRight = ({ Img }) => {
  return (
    <div className="authentication-right-wrap">
      <div className="authentication-right-wrap-container">
        <div className="authentication-right-img">
          <img src={Img} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AuthenticationRight;
