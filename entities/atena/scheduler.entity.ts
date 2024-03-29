import { User } from "./User";

export interface SchedulerEntity {
    id: string;
    name: string;
    type: string;
    queue: string;
    mail: boolean;
    userId: string;
    enabled: boolean;
    deleted: boolean;
    createdAt: Date | string;
    updatedAt: Date | string;
    User: User;
}
