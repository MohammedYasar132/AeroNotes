import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { getAuth } from "firebase/auth"; // Import Firebase Auth

// Helper to get the fresh Firebase ID Token
const getAuthHeaders = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    // This fetches a fresh token or a cached one if it's still valid
    const token = await user.getIdToken(); 
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
  }
  return { withCredentials: true }; // No user, send request without token
};

export const getCurrentUser = async (dispatch) => {
  try {
    const headers = await getAuthHeaders();
    const result = await axios.get(`${serverUrl}/api/user/currentuser`, headers);
    dispatch(setUserData(result.data));
  } catch (error) {
    console.error("User Fetch Error:", error.response?.data?.message || error.message);
  }
};

export const generateNotes = async (payload) => {
  try {
    const headers = await getAuthHeaders();
    const result = await axios.post(`${serverUrl}/api/notes/generate-notes`, payload, headers);
    return result.data;
  } catch (error) {
    console.error("Generate Notes Error:", error.response?.data?.message || error.message);
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
