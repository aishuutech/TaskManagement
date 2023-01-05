import { User } from "src/user/entities/user.entity";

export class LoginResponse {
    accessToken:string
    user:User;
}