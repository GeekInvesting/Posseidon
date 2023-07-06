import {Ticket} from "~/model/hefesto/Ticket";
import {InvestorHera} from "~/model/hera/InvestorHera";
import {Operation} from "~/model/zeus/operation.entity";
import {BrokerEntity} from "~/model/zeus/broker.entity";
import {integer} from "vscode-languageserver-types";

export interface WalletEntity {
  id: string;
  investorId: string;
  Investor: Partial<InvestorHera>;
  ticketId: string;
  Ticket: Ticket;
  operationId: string;
  Operation: Operation;
  brokerId: string;
  Broker: BrokerEntity;
  dateOperation: Date | string;
  amount: integer;
  price: number;
  tax: number;
  total: number;
  enabled: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface CreateWalletDto extends Partial<WalletEntity> {}
