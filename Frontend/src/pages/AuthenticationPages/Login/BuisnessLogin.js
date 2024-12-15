import React, { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Brand from "../../../assets/brand";
import AuthImages from "../../../assets/AuthImages";
import { login } from "../../../services/Authentication";
import "./auth.css";
import AuthenticationRight from "../../../components/AuthenticationComponents/AuthenticationRight";
import AuthenticationModals from "../../../modals/AuthenticationModals";

const BuisnessLogin = () => {
  useEffect(() => {
    document.title = "Login to Recall"; // Set the new title
    return () => {
      document.title = "Recall | Recycling Revolutionized";
    };
  }, []);
  const inputs = [
    {
      type: "email",
      label: "Your Email Id",
      useinput: true,
      placeholder: "Enter your email Id here...",
    },
    {
      type: "password",
      label: "Your Password",
      useinput: true,
      placeholder: "Enter your password Id here...",
    },
    {
      useinput: false,
      typeOf: "individual",
    },
  ];
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    type_of: "business",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await login(navigate, formData);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const renderInput = (input) => {
    if (input.useinput) {
      return (
        <>
          <p>
            {input.label} <span>*</span>
          </p>
          <input
            className=""
            type={input.type}
            name={input.type}
            value={formData[input.type]}
            onChange={handleChange}
            placeholder={input.placeholder}
          />
        </>
      );
    } else {
      return null;
    }
  };
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  return (
    <div className="authentication-flex">
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
      <div className="authentication-left">
        <img src={Brand.Logo} alt="" />
        <div className="recall-store-login-input">
          <div className="recall-store-login-header">
            <h1>Get Started</h1>
            <p>
              New to Recall ?{" "}
              <span
                onClick={() => {
                  setShowSignupModal(true);
                }}
              >
                {" "}
                Signup
              </span>
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            {inputs.map((input, index) => (
              <div className="recall-store-input" key={index}>
                {renderInput(input)}
              </div>
            ))}
            <button className="recall-store-login-btn" type="submit">
              Login
            </button>
          </form>
          <div className="terms-login">
            By joining, you agree to our <span>Terms of Use </span> &{" "}
            <span>Privacy policy.</span>
          </div>
        </div>
      </div>
      <AuthenticationRight Img={AuthImages.BuisnessLoginPerson} />
    </div>
  );
};

export default BuisnessLogin;
