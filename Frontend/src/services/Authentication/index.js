import { errorToast } from "../../utils/toast";
import apiCall from "../apiCall";

function handleSuccess(data, navigate) {
  const userData = {
    private_key: data?.private_key,
    username: data?.user.name,
    user_id: data?.user.id,
  };
  localStorage.setItem("userData", JSON.stringify(userData));
  navigate("/dashboard");
  return data;
}

export const signUp = async (formData) => {
  return apiCall("/signup", "POST", formData);
};

export const login = async (navigate, formData) => {
  try {
    const data = await apiCall("/login", "POST", formData);
    return handleSuccess(data, navigate);
  } catch (error) {
    errorToast(error.message);
  }
};

export const signUpConfirm = async (navigate, formData) => {
  try {
    const data = await apiCall("/signup_confirm", "POST", formData);
    return handleSuccess(data, navigate);
  } catch (error) {
    console.error(error);
    throw new Error(`Signup failed: ${error.message}`);
  }
};
