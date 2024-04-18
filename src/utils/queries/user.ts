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
      oldPassword: btoa(oldPassword),
    });
    return res;
  } catch (error) {
    return null;
  }
};

export const deleteUserById = async (id: string) => {
  try {
    const res = await axiosInstance.delete("/delete-user", {
      params: {
        userId: id,
      },
    });
    return res;
  } catch (error) {
    return null;
  }
};

export const getUsers = async (email: string) => {
  try {
    const res = await axiosInstance.get("/get-users", {
      params: {
        requesterEmail: email,
      },
    });
    return res.data.users;
  } catch (error) {
    return [];
  }
};
