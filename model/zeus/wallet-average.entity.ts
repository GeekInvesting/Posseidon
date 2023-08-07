import {BrokerEntity} from "~/model/zeus/broker.entity";
import {InvestorHera} from "~/model/hera/InvestorHera";
import {Ticket} from "~/model/hefesto/Ticket";

export interface WalletAverageEntity {
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
