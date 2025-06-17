import { API_ENDPOINT } from "./ApiEndPoint";

export const ApiPostRequest = {
  addUserData: async ({ userName, phoneNo }) => {
    try {
      const response = await fetch(`${API_ENDPOINT.corePath}user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, phoneNo }),
      });

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      return await response.json();
    } catch (error) {
      console.log("Error adding user:", error);
      return null;
    }
  },
};
