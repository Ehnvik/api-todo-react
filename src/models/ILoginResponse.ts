import { ILoginResponseUser } from "./ILoginResponseUser";

export interface ILoginResponse {
  token: string;
  user: ILoginResponseUser;
}
