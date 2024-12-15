import apiCall from "../../apiCall";

export const getUserStats = async () => {
  try {
    const key = JSON.parse(localStorage.getItem("userData"));
    const payload = {
      key: key.private_key,
    };

    return apiCall(`/getStats?private_key=${payload.key}`, "GET", null);
  } catch (error) {
    throw new Error(`Getting Admin Stats failed: ${error.message}`);
  }
};

export const recallHistory = async () => {
  try {
    const key = JSON.parse(localStorage.getItem("userData"));
    const payload = {
      private_key: key.private_key,
    };

    return apiCall("/recallHistory", "POST", payload);
  } catch (error) {
    throw new Error(`Getting Admin Stats failed: ${error.message}`);
  }
};

export const getUserData = async () => {
  try {
    const payload = {
      private_key: JSON.parse(localStorage.getItem("userData"))?.private_key,
    };

    return apiCall("/login", "POST", payload);
  } catch (error) {
    throw new Error(`Getting User Data failed: ${error.message}`);
  }
};

export const updateUserData = async (formData) => {
  try {
    return apiCall("/updateUser", "PUT", formData);
  } catch (error) {
    throw new Error(`Update failed: ${error.message}`);
  }
};
