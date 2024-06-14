export interface ILoginRequest {
  email: string;
  password: string;
  type: "sellers" | "customers";
}

export interface IBaseUser {
  email: string;
  name: string;
  password: string;
}

export interface IGetCurrentCustomerRequest {
  id: string;
}
