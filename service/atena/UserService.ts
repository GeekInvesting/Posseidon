//service/atena/UserService.ts
import { User } from "~/model/atena/User";
import { urlAtena } from "~/service/BaseUrl";
import { ApiService } from "../ApiService";
import { apiErrorHandler } from "~/middleware/apiErrorHandler";

export const createUser = async (data: Partial<User>) => {
  const { userName, userEmail, userPassword, userRole} = data;

  const user: Partial<User> = {
    userName: userName ? userName : "",
    userEmail: userEmail ? userEmail : "",
    userPassword: userPassword ? userPassword : "",
    userRole: userRole ? userRole : "user"
  }
console.log(user);
  const response = await fetch(`${urlAtena}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  return response;
};

export const getUser = async () => {
  const response = await fetch(`${urlAtena}/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "authorization": "Bearer " + localStorage.getItem("token")
    },
  });

  return response;
}

export class UserService extends ApiService {
  baseUrl = `${urlAtena}/user`

  constructor() { super() }

  async getAllUsers(): Promise<Response> {
    const url = `${this.baseUrl}/name/all`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "GET",
    });
  }

  async createUser(user: Partial<User>): Promise<Response> {
    //console.log(user);
    const url = `${this.baseUrl}`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  }

  async findAll(): Promise<Response> {
    const url = `${this.baseUrl}/all`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "GET",
    });
  }

  async updateUser(user: Partial<User>): Promise<Response> {
    const url = `${this.baseUrl}/${user.id}`;
    //console.log(url);
    return await apiErrorHandler(this.fetch)(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  }
}
