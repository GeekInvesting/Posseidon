export class GetLogin {
  user: any;
  constructor() {
    this.user = JSON.parse(localStorage.getItem("user") || "{}");;
  }

  isAdmin(): boolean {
    return this.user && this.user.userRole === "admin";
  }

  isLoged(): boolean {
    return (this.user && this.user.userRole === "admin") || this.user.userRole === "user";
  }
}
