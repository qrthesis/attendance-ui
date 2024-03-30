import axiosInstance from "./axios.config";

export const createAdmin = async (
  name: string,
  email: string,
) => {
  try {
    const res = await axiosInstance.post("/create-admin", {
      name,
      email,
    });
    return {
      message: res.data.message,
      status: res.status,
    };
  } catch (error) {
    return null;
  }
};

export const getAdmin = async () => {
  try {
    const res = await axiosInstance.get("/get-admins");
    console.log("getAdmin", res);
    return res.data.admins;
  } catch (error) {
    return [];
  }
};
