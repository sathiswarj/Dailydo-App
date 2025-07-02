import { API_ENDPOINT } from "./ApiEndPoint";

export const ApiPostRequest = {
  addUserData: async ({ phoneNo, emailId }) => {
    try {
      const response = await fetch(`${API_ENDPOINT.corePath}users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNo, emailId }),
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
  addPostData: async ({ title, description, userId }) => {
    try {
      const response = await fetch(`${API_ENDPOINT.corePath}notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to add note");
      }

      return await response.json();
    } catch (error) {
      console.log("Error adding note:", error);
      return null;
    }
  },
  updatePostData: async ({ noteId, title, description, userId }) => {
    try {
      const response = await fetch(`${API_ENDPOINT.corePath}notes/note/${noteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to update note");
      }

      return await response.json();
    } catch (error) {
      console.log("Error updating note:", error);
      return null;
    }
  }

};
