import { User } from "./User";

export interface Investor {
    investorId: string;
    investorName: string;
    investorDoc: string;
    investorCountry: string;
    investorEnabled: boolean;
    investorDeleted: boolean;
    investorUser: Partial<User>;
}