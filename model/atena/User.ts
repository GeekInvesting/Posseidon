export interface User {
    userId: string;
    userName: string;
    userEmail: string;
    userPassword: string;
    userRole: string;
    userEnabled: boolean;
    userDeleted: boolean;
    UserCreatedAt: Date;
    userConfirmPassword: string;
}