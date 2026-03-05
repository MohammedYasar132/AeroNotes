import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";

// Helper to get the token and build headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token"); // Adjust key name if yours is different
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
};

export const getCurrentUser = async (dispatch) => {
  try {
    const result = await axios.get(
      `${serverUrl}/api/user/currentuser`, 
      getAuthHeaders()
    );

    dispatch(setUserData(result.data));
  } catch (error) {
    // Safely log the specific server error message
    console.error("User Fetch Error:", error.response?.data?.message || error.message);
  }
};

export const generateNotes = async (payload) => {
  try {
    const result = await axios.post(
      `${serverUrl}/api/notes/generate-notes`,
      payload,
      getAuthHeaders()
    );
    
    return result.data;
  } catch (error) {
    console.error("Generate Notes Error:", error.response?.data?.message || error.message);
    // Re-throw so the UI component can show an alert/toast
    throw error; 
  }
};

export const downloadPdf = async (resultData) => {
  try {
    const response = await axios.post(
      `${serverUrl}/api/pdf/generate-pdf`,
      { result: resultData },
      {
        ...getAuthHeaders(),
        responseType: "blob",
      }
    );

    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "ExamNotesAI.pdf");
    document.body.appendChild(link);
    link.click();

    // Clean up
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("PDF download failed", error);
    throw new Error("PDF download failed");
  }
};
