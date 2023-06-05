import { Company } from "./Company";
import { Exchange } from "./Exchange";
import { Subsector } from "./Subsector";
import { TypeModel } from "./TypeModel";

export interface Ticket {
    id: string;
    ticketCode: string;
    ticketCompany: Company;
    ticketType: TypeModel;
    ticketSubsector: Subsector;
    ticketExchange: Exchange;
    ticketAlpha: string;
    ticketCvmCode: string;
    ticketEnabled: boolean;
    ticketDeleted: boolean;
};

export interface TicketDTO {
    id: string;
    ticketCode: string;
    ticketCompanyName: string;
    ticketTypeCode: string;
    ticketSubsectorName: string;
    ticketExchangeCode: string;
    ticketAlpha: string;
    ticketCvmCode: string;
    ticketEnabled: boolean;
    ticketDeleted: boolean;
};