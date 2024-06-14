export interface Status {
  status: string | number;
  message?: string | object[];
}

export interface IBaseUserResponse {
  email: string;
  name: string;
}

export interface LoginUser extends IBaseUserResponse {}

export interface Register extends Status {
  data: IBaseUserResponse;
}
