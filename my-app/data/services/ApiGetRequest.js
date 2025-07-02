import { API_ENDPOINT } from "./ApiEndPoint";

export const ApiGetRequest = {
  getAllNotesPerId: async ({ userId }) => {
    try {
      const response = await fetch(`${API_ENDPOINT.corePath}notes/${userId}`, {
        method: "GET",
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
    try {
      const response = await fetch(`${API_ENDPOINT.corePath}notes/note/${noteId}`, {
        method: "GET",
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
