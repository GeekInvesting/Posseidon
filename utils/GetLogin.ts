import {User} from "~/entities/atena/User";

export class GetLogin {
  user: User;
  constructor() {
    this.user = JSON.parse(localStorage.getItem("user") || "{}");
    //console.log(this.user);
  }

  isAdmin(): boolean {
    return this.user && this.user.userRole === "ADMIN";
  }

  isLoged(): boolean {
    return (this.user && this.user.userRole === "ADMIN") || this.user.userRole === "USER";
  }

  userName(): string {
    return this.user.userName;
  }

  getUser(): User {
    return this.user;
  }

  getUserId(): string {
    return this.user.id;
  }
}
