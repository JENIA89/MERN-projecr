export interface ILoginModel {
  email: string;
  password: string;
}

export interface IRegisterModel extends ILoginModel{
  firstName: string;
  lastName: string;
  confirmPassword: string;
}
