import axiosInstance from "./axios.config";

export const createStudent = async (
  name: string,
  email: string,
  password: string,
  course: string
) => {
  try {
    const res = await axiosInstance.post("/create-student", {
      name,
      email,
      course,
      password: btoa(password),
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
    const res = await axiosInstance.get("/get-students");
    return res.data.students;
  } catch (error) {
    return [];
  }
};
