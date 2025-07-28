import { API_ENDPOINT } from "./ApiEndPoint";
import { getUser } from "@/utils/storage";
export const ApiGetRequest = {
    
  getAllNotesPerId: async ({ userId }) => {
    const user = await getUser();
  const token = user?.token;
    try {
      const response = await fetch(`${API_ENDPOINT.corePath}notes/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }

      return await response.json();
    } catch (error) {
      console.log("Error fetching notes:", error);
      return null;
    }
  },

  getNotePerId: async ({ noteId }) => {
      const user = await getUser();
  const token = user?.token;
    try {
      const response = await fetch(`${API_ENDPOINT.corePath}notes/note/${noteId}`, {
        method: "GET",
                headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },

      });

      if (!response.ok) {
        throw new Error("Failed to fetch note");
      }

      return await response.json();
    } catch (error) {
      console.log("Error fetching note:", error);
      return null;
    }
  },

};
