interface IBaseAccount {
  id: string;
  email: string;
  type: "customer" | "seller";
  name: string;
}

interface ICustomer extends IBaseAccount {}
