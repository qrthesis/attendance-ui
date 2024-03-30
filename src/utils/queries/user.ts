import axiosInstance from "./axios.config";

export const resetPassword = async (
  email: string,
  oldPassword: string,
  newPassword: string
) => {
  try {
    const res = await axiosInstance.post("/reset-password", {
        email,
        newPassword: btoa(newPassword),
        oldPassword: btoa(oldPassword)
    })
        return res;
  } catch (error) {
    return null;
  }
};