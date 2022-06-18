export interface ILoginModel {
  email: string;
  password: string;
}

export interface IRegisterModel extends ILoginModel{
  firstName: string;
  lastName: string;
  confirmPassword: string;
}

export interface IUser {
  token: string;
  result: {
    _id: string;
    name: string;
    email: string;
    password: string;
  }
}

export interface ITour {
  title: string;
  description: string;
  tags: Array<string>;
  imageFile: string;
  _id?: string;
}
