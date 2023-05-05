import { User } from "~/model/atena/User";
import { urlAtena } from "~/utils/BaseUrl";

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
