import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthenticationPages from "../pages/AuthenticationPages";
import LandingPage from "../pages/LandingPage/LandingPage";
import DashboardPages from "../pages/DashboardPages";
import Home from "../pages/Home/Home";
import Terms from "../pages/Terms/Terms";
import Privacy from "../pages/Terms/Privacy";
import BinLocations from "../pages/BinLocations/BinLocations";

const authService = {
  isAuthenticated: () => {
    const user = JSON.parse(localStorage.getItem("userData"));
    return user !== null;
  },
};
const PrivateRoute = ({ path, element }) => {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login/individual" />;
  }
  return element;
};
const routes = [
  {
    path: "/",
    exact: true,
    name: "Home",
    element: <LandingPage />,
    private: false,
  },
  {
    path: "/home",
    exact: true,
    name: "Home",
    element: <Home />,
    private: false,
  },
  {
    path: "/binlocations",
    exact: true,
    name: "Bin Locations",
    element: <BinLocations />,
    private: false,
  },
  {
    path: "/privacy-policy",
    exact: true,
    name: "Home",
    element: <Privacy />,
    private: false,
  },
  {
    path: "/terms-of-use",
    exact: true,
    name: "Home",
    element: <Terms />,
    private: false,
  },
  {
    path: "/login/business",
    exact: true,
    name: "Login",
    element: <AuthenticationPages.BuisnessLogin />,
    private: false,
  },
  {
    path: "/login/individual",
    exact: true,
    name: "Login",
    element: <AuthenticationPages.IndividualLogin />,
    private: false,
  },
  {
    path: "/signup/business",
    exact: true,
    name: "Signup",
    element: <AuthenticationPages.BusinessSignup />,
    private: false,
  },
  {
    path: "/signup/individual",
    exact: true,
    name: "Signup",
    element: <AuthenticationPages.IndividualSignup />,
    private: false,
  },
  {
    path: "/dashboard",
    exact: true,
    name: "Dashboard",
    element: <DashboardPages.Dashboard />,
    private: true,
  },
  {
    path: "/contact",
    exact: true,
    name: "Dashboard",
    element: <DashboardPages.Contact />,
    private: true,
  },
  {
    path: "/profile",
    exact: true,
    name: "Dashboard",
    element: <DashboardPages.Profile />,
    private: true,
  },
  {
    path: "/locations",
    exact: true,
    name: "Locations",
    element: <DashboardPages.Locations />,
    private: true,
  },
];

export default function Navigation() {
  const user = JSON.parse(localStorage.getItem("userData"));
  console.log(user);

  return (
    <>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              route.private ? <PrivateRoute {...route} /> : route.element
            }
          />
        ))}
      </Routes>
    </>
  );
}
