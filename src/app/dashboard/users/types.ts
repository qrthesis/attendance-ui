export interface IAdminUser {
  name: string;
  email: string;
  password: string;
}

export interface ICreateAdminModalProps {
  isVisible: boolean;
  updateVisibility: (modalType: "student" | "admin") => void;
  adminUser: IAdminUser;
  updateAdminDetails: (key: string, value: string) => void;
  addAdmin: () => void;
}

export interface ICreateUserModal {
  admin: boolean;
  student: boolean;
}
