export interface IAdminUser {
  name: string;
  email: string;
  password: string;
}

export interface IStudentUser extends IAdminUser {
  course: string;
}

export interface ICreateAdminModalProps {
  isVisible: boolean;
  updateVisibility: (user: "admin" | "student") => void;
  adminUser: IAdminUser;
  updateAdminDetails: (key: string, value: string) => void;
  addAdmin: () => void;
}

export interface ICreateStudentModalProps {
  isVisible: boolean;
  updateVisibility: (user: "admin" | "student") => void;
  studentUser: IStudentUser;
  updateStudentDetails: (key: string, value: string) => void;
  addStudent: () => void;
}
