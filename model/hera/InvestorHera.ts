import { City } from "./City";

export interface InvestorHera {
    id: string;
    investorName: string;
    investorDoc: string;
    investorAdress: string;
    investorCity: City;
    investorEnabled: boolean;
    investorDeleted: boolean;
    investorUser: string;
}

export interface InvestorDto {
    id: string;
    investorName: string;
    investorDoc: string;
    investorAdress: string;
    investorCity: string;
    investorEnabled: boolean;
    investorDeleted: boolean;
    investorUser: string;
}