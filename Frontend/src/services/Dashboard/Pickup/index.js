import apiCall from "../../apiCall";

export const getAreas = async () => {
  try {
    return apiCall("/getAllAreas", "GET", null);
  } catch (error) {
    throw new Error(`Getting User Data failed: ${error.message}`);
  }
};

export const requestPickup = async (formData) => {
  try {
    return apiCall("/schedulePickup", "POST", formData);
  } catch (error) {
    throw new Error(`Request for Pickup failed: ${error.message}`);
  }
};
