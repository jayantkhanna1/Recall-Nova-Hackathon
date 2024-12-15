import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
const SideBarWidth = () => {
  const location = useLocation();
  const [show, setshow] = useState(true);
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
  return <>{show ? <div className="sidebar-width"></div> : null}</>;
};

export default SideBarWidth;
