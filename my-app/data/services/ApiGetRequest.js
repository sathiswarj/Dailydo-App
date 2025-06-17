import { API_ENDPOINT } from "./ApiEndPoint";

export const ApiGetRequest = {
    getAllNotesPerId : async (phoneNo)=>{
        try {
            const response  = await fetch (`${API_ENDPOINT.corePath}/notes/${userId}`)
            if(!response){
                throw new Error("Failed to fetch notes")
            }
            return await response.json()

        } catch (error) {
            console.log("Error fetching notes",error)
            return null
        }
    }
}