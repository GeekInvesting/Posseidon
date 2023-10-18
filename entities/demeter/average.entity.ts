import {BrokerEntity} from "~/entities/zeus/broker.entity";
import {InvestorHera} from "~/entities/hera/InvestorHera";
import {Ticket} from "~/entities/hefesto/Ticket";

export interface AverageEntity {
    investorId: string;
    Investor: InvestorHera;
    ticketId: string;
    Ticket: Ticket;
    brokerId: string;
    Broker: BrokerEntity;
    amount: number;
    averagePrice: number;
    total: number;
    currentPrice: number;
    result: number;
    resultPercent: number;
    profit: number;
    profitability: number;
}
