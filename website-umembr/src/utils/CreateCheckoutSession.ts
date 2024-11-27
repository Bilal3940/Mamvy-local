import { fallbackRestUrl } from "./path";
const API_URL = process.env.REST_URL || fallbackRestUrl;

export const createCheckoutSession = async (token: string, payload:any) => {
  if (token) {
    try {
      const response = await fetch(`${API_URL}/subscription/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)  // Append payload here
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to create checkout session:", error);
      return null;
    }
  } else {
    console.log("No token provided");
  }
};
