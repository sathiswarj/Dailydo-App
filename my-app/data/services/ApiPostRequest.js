import { API_ENDPOINT } from "./ApiEndPoint";
import { getUser, saveUser } from "@/utils/storage";

export const ApiPostRequest = {
  /** Register user */
  addUserData: async ({ password, email, name } ) => {
    try {
      const response = await fetch(`${API_ENDPOINT.corePath}users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to add user");
      }

      if (data?.token) {
        await saveUser({ ...data.user, token: data.token });
      }

      return data;
    } catch (error) {
      console.log("❌ Error adding user:", error);
      return null;
    }
  },

  /** Login user */
  login: async ({ password, email } ) => {
    try {
      const response = await fetch(`${API_ENDPOINT.corePath}users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to login user");
      }

      if (data?.token) {
        await saveUser({ ...data.user, token: data.token });
      }

      return data;
    } catch (error) {
      console.log("❌ Error logging in user:", error);
      return null;
    }
  },

addPostData: async ({ title, description, time, priority, status }) => {
  const user = await getUser();
  const token = user?.token;

  if (!token) {
    console.warn("❌ Missing token - cannot add note.");
    return null;
  }

  try {
    const response = await fetch(`${API_ENDPOINT.corePath}notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,  
      },
      body: JSON.stringify({
        title,
        description,
        time,
        priority,
        status
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data?.message || "Failed to add note");

    return data;
  } catch (error) {
    console.error("❌ Error adding note:", error);
    return null;
  }
},
  /** Update an existing note */
  updatePostData: async ({ noteId, title, description }) => {
    const user = await getUser();
    const token = user?.token;

    if (!token) {
      console.warn("❌ Missing token - cannot update note.");
      return null;
    }

    try {
      const response = await fetch(`${API_ENDPOINT.corePath}notes/note/${noteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to update note");
      }

      return data;
    } catch (error) {
      console.log("❌ Error updating note:", error);
      return null;
    }
  }
};
