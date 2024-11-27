import { fallbackRestUrl } from "./path";
const API_URL = process.env.REST_URL || fallbackRestUrl;

export async function RefreshUserData(token: any, userId: any) {
  if (token) {
    try {
      // Pass user_id as a query parameter
      const response = await fetch(`${API_URL}/users/refersh-user?user_id=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to refresh user data:", error);
      return null; 
    }
  } else {
    console.log("No token provided");
  }
}
