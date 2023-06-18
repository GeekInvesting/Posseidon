export interface User {
    id: string;
    userName: string;
    userEmail: string;
    userPassword: string;
    userRole: string;
    userEnabled: boolean;
    userDeleted: boolean;
    userCreatedAt: Date;
    userUpdatedAt: Date;
}