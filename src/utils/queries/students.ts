import axiosInstance from "./axios.config";

export const createStudent = async (
  name: string,
  email: string,
  department: string,
  course: string
) => {
  try {
    const res = await axiosInstance.post("/create-student", {
      name,
      email,
      department,
      course,
    });
    return res
  } catch (error) {
    //@ts-ignore
    return error?.response;
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
