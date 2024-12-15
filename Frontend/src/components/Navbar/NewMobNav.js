import React, { useState, useEffect } from "react";
import DashboardIcons from "../../assets/DashboardIcons";
import SideBarIcons from "../../assets/SideBarIcons"; 
import { useLocation } from "react-router-dom";  
import MobileSidebar from "../SideBar/MobileSidebar";
const MobileNavbar = () => {
    const [, setshow] = useState(true);
    const [showMenu, setShowMenu] = useState(false);
    const location = useLocation();
    useEffect(() => {
        if ( 
            location.pathname === "/" ||
            location.pathname === "/login" ||
            location.pathname === "/signup" ||
            location.pathname === "/login-business" || 
            location.pathname === "/signup-business" ||
            location.pathname === "/terms-and-conditions" ||
            location.pathname === "/privacy-policy" 
        ) {
            setshow(false);
        } else {
            setshow(true);
        }
        if(showMenu){
            document.body.style.overflow = "hidden";
        }
        else{
            document.body.style.overflow = "unset";
        }
    }, [location,showMenu]);

  
    return (
        <>
            <div
                className={
                    showMenu
                        ? "mobile-sidebar-container open-sidebar"
                        : "mobile-sidebar-container"
                }
            >
                <MobileSidebar />
            </div>
            <div className="mobile-nav">
                <div className="mobile-nav-logo">
                    <img src={SideBarIcons.Logo} alt="" />
                </div>
                <div className="mobile-menu">
                    <img
                        onClick={() => {
                            setShowMenu(!showMenu);

                            
                        }}
                        src={DashboardIcons.Menu}
                        alt=""
                    />
                </div>
            </div>
        </>
    );
};

export default MobileNavbar;
