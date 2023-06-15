export class GetLogin {
  user: any;
  constructor() {
    this.user = JSON.parse(localStorage.getItem("user") || "{}");
    console.log(this.user);
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
}
