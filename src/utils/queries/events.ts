import axiosInstance from './axios.config'

export const createEvent = async (eventName: string, description: string, date: any) => {
   try {
    const res = await axiosInstance.post("/create-event", {
        eventName,
        description,
        date
    })
        return {
            message: res.data.message,
            status: res.status 
        };
   } catch (error) {
        return null 
   }
}