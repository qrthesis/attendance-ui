import axiosInstance from "./axios.config";

export const createStudent = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const res = await axiosInstance.post("/create-student", {
      name,
      email,
      password,
      role: "student",
    });
    return {
      message: res.data.message,
      status: res.status,
    };
  } catch (error) {
    return null;
  }
};

export const getStudents = async () => {
  try {
    const res = await axiosInstance.post("/get-students");
    return res;
  } catch (error) {
    return null;
  }
};
