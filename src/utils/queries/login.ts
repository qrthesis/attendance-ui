import axiosInstance from './axios.config'

export const login = async (email: string, password: string) => {
   try {
    console.log(btoa(password))
    const res = await axiosInstance.post("/login", {
        email,
        password: btoa(password)
    })
        return res.data.user;
   } catch (error) {
        return null 
   }
}