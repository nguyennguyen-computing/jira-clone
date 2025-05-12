import { User } from "../schemas/user.schema";

export interface LoginResponse {
  user: User;
  token: string;
}
