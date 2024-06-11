interface IBaseAccount {
  id: string;
  email: string;
  type: "customer" | "seller";
  name: string;
}

export interface ICustomer extends IBaseAccount {}

export type LoginFormData = {
  email: string;
  password: string;
};
