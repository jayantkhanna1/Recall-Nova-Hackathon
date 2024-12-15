import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Brand from "../../../assets/brand"; 
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import AuthImages from "../../../assets/AuthImages";
import { signUp, signUpConfirm } from "../../../services/Authentication";
import AuthenticationRight from "../../../components/AuthenticationComponents/AuthenticationRight";
import VerifyOtp from "../../../modals/AuthenticationModals/VerifyOtp";
import { errorToast, successToast } from "../../../utils/toast.js";
import AuthenticationModals from "../../../modals/AuthenticationModals";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import zone from "../../../data/zone.json";
import DashboardIcons from "../../../assets/DashboardIcons";

const BusinessSignup = () => {
  const mapContainerStyle = {
    width: "100%",
    height: "700px",
  };
  const navigate = useNavigate();
  const [mapCenter, setMapCenter] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [active, setActive] = useState(0);
  const [open2, setOpen2] = useState(false);
  const [otpvalue, setotpvalue] = useState();
  const [selectedZone, setSelectedZone] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [openMapSheet, setOpenMapSheet] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    address: "",
    organization_name: "",
    designation: "",
    type_of_business: "",
    business_name: "",
    area: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    lattitude: "",
    longitude: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    address: "",
    // organization_name: "",
    designation: "",
    type_of_business: "",
    business_name: "",
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const userLocation = {
          lat: latitude,
          lng: longitude,
        };
        setMapCenter(userLocation);
        setMarkerPosition(userLocation);
      });
    }
  }, []);

  useEffect(() => {
    document.title = "Signup with Recall"; // Set the new title
    return () => {
      document.title = "Recall | Recycling Revolutionized";
    };
  }, []);

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleChange = (event) => {
    setSelectedZone(event.target.value);
    // now update the formData state for area
    setFormData({ ...formData, area: `Zone${event.target.value}` });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleStep1Submit = async () => {
    if (formData.email && formData.password) {
      const updatedFormData = {
        email: formData.email,
        password: formData.password,
        type_of: "business",
      };
      const response = await signUp(updatedFormData);
      console.log(response);
      setFormData({
        ...formData,
        password: response?.password,
      });
      setotpvalue(response?.otp);
      successToast(response?.message);
      setOpen2(true);
    } else {
      errorToast("Please fill in all fields before proceeding.");
    }
  };
  console.log(formData);
  const handleStep2Next = () => {
    if (formData.name && formData.phone && formData.address) {
      if (formData.phone.length !== 10) {
        errorToast("Phone number must be exactly 10 digits long.");
      } else {
        setActive(active + 1);
      }
    } else {
      errorToast("Please fill in all fields before proceeding.");
    }
  };

  const handleFormSubmit = async () => {
    if (
      formData.designation &&
      formData.type_of_business &&
      formData.business_name
    ) {
      const payload = {
        ...formData,
        type_of: "business",
      };
      try {
        const response = await signUpConfirm(navigate, payload);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    } else {
      errorToast("Please fill in all fields before proceeding.");
    }
  };
  const inputFields = [
    [
      {
        label: "Your Email Id",
        name: "email",
        type: "text",
        placeholder: "Enter your email Id here...",
      },
      {
        label: "Your Password",
        name: "password",
        type: "password",
        placeholder: "Enter your password Id here...",
      },
    ],
    [
      {
        name: "name",
        type: "text",
        placeholder: "Enter your name here...",
        label: "Your Name",
      },
      {
        name: "phone",
        type: "tel",
        placeholder: "Enter your phone number here...",
        label: "Your Phone Number",
      },
      {
        name: "address",
        type: "select",
        label: "Your Locations",
        placeholder: "Select Emirate",
        options: [
          "Abu Dhabi",
          "Dubai",
          "Sharjah",
          "Ajman",
          "Umm Al Quwain",
          "Ras Al Khaimah",
          "Fujairah",
        ],
      },
      {
        name: "area",
        type: "select",
        zoneField: true,
        label: "Your Area",
        placeholder: "Select Area",
        options: zone.map((item) => item["Name"]),
      },
    ],
    [
      // {
      //   name: "organization_name",
      //   label: "Organization Name",
      //   type: "text",
      //   placeholder: "Enter your organization name here...",
      // },
      {
        name: "business_name",
        type: "text",
        label: "Business Name",
        placeholder: "Enter your business name here...",
      },
      {
        name: "designation",
        type: "text",
        label: "Your Designation",
        placeholder: "Enter your designation here...",
      },
      {
        name: "type_of_business",
        type: "select",
        label: "Type of Business",
        placeholder: "Select Type of Business",
        options: [
          "Retail Outlets",
          "Offices",
          "Restaurants & Hospitality",
          "Schools & Educational Institutions",
          "Stadiums & Arenas",
          "Other",
        ],
      },
    ],
  ];

  return (
    <>
      <BottomSheet
        onDismiss={() => {
          setOpenMapSheet(false);
        }}
        open={openMapSheet}
      >
        <LoadScript googleMapsApiKey="AIzaSyDITy2QJp4holPEU6hV017HVFmDKB-I69U">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={mapCenter}
            zoom={15}
          >
            {markerPosition && (
              <Marker
                position={markerPosition}
                draggable={true}
                onDragEnd={(e) => {
                  const newPosition = {
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                  };

                  console.log("New Position:", newPosition);
                  setMarkerPosition(newPosition);
                  setFormData({
                    ...formData,
                    lattitude: newPosition.lat,
                    longitude: newPosition.lng,
                  });
                }}
              />
            )}
          </GoogleMap>
        </LoadScript>
      </BottomSheet>
      <VerifyOtp
        active={active}
        setActive={setActive}
        otpvalue={otpvalue}
        open={open2}
        handleClose={handleClose2}
      />
      <AuthenticationModals.SignupModal
        open={showSignupModal}
        setShowLoginModal={setShowLoginModal}
        handleClose={() => setShowSignupModal(false)}
      />
      <AuthenticationModals.LoginModal
        open={showLoginModal}
        setShowSignupModal={setShowSignupModal}
        handleClose={() => setShowLoginModal(false)}
      />
      <div className="authentication-flex">
        <div className="authentication-left">
          <img src={Brand.Logo} alt="" />
          <div className="recall-store-login-input">
            <div className="recall-store-login-header">
              <h1>Get Started</h1>
              <p>
                Already have an account?{" "}
                <span
                  onClick={() => {
                    setShowLoginModal(true);
                  }}
                >
                  {" "}
                  Login
                </span>
              </p>
            </div>

            {inputFields[active].map((field) => {
              if (field.name === "area" && formData.address !== "Dubai") {
                return null; // Skip rendering the area field if the address is not Dubai.
              }
              return (
                <div className="recall-store-input" key={field.name}>
                  {field.type === "select" ? (
                    <>
                      {field.zoneField ? (
                        <>
                          <p>
                            {field.label} <span>*</span>
                          </p>
                          <select
                            id="zoneSelect"
                            value={selectedZone}
                            name={field.name}
                            onChange={handleChange}
                          >
                            <option value="">Select</option>
                            {zone.map((item) => (
                              <option
                                key={item["Community #"]}
                                value={item["Zone"]}
                              >
                                {item["Name"]}
                              </option>
                            ))}
                          </select>
                        </>
                      ) : (
                        <>
                          <p>
                            {field.label} <span>*</span>
                          </p>
                          <select
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleInputChange}
                            required={true}
                          >
                            <option value="">{field.placeholder}</option>
                            {field.options.map((option) => (
                              <option value={option}>{option}</option>
                            ))}
                          </select>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <p>
                        {field.label} <span>*</span>
                      </p>
                      <input
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        required={true}
                      />
                    </>
                  )}
                </div>
              );
            })}
            {active === 2 && (
              <div
                onClick={() => {
                  setOpenMapSheet(true);
                }}
                className="picklocation-mark"
              >
                <img src={DashboardIcons.Mark} alt="" />
                Click here to pick your location on the map
              </div>
            )}
            {/* <select id="zoneSelect" value={selectedZone} onChange={handleChange}>
        <option value="">Select</option>
        {zone.map((item) => (
          <option key={item["Community #"]} value={item["Zone"]}>
            {item["Name"]}
          </option>
        ))}
      </select> */}
            {/* {selectedZone && <p>Selected Zone: Zone {selectedZone}</p>} */}
            {active === 0 ? (
              <>
                <button
                  className="recall-store-login-btn"
                  onClick={handleStep1Submit}
                >
                  Send OTP
                </button>
              </>
            ) : active === 1 ? (
              <>
                <button
                  className="recall-store-login-btn"
                  onClick={handleStep2Next}
                >
                  Next
                </button>
              </>
            ) : active === 2 ? (
              <>
                <button
                  className="recall-store-login-btn"
                  onClick={handleFormSubmit}
                >
                  Submit
                </button>
              </>
            ) : null}
            <div
              onClick={() => {
                // setOpenMapSheet(true);
              }}
              className="terms-login"
            >
              By joining, you agree to our <span>Terms of Use </span> &{" "}
              <span>Privacy policy.</span>
            </div>
          </div>
        </div>
        <AuthenticationRight Img={AuthImages.BuisnessLoginPerson} />
      </div>
    </>
  );
};

export default BusinessSignup;
