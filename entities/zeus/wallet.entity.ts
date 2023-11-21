import {Ticket} from "~/entities/hefesto/Ticket";
import {InvestorHera} from "~/entities/hera/InvestorHera";
import {Operation} from "~/entities/zeus/operation.entity";
import {BrokerEntity} from "~/entities/zeus/broker.entity";
import {integer} from "vscode-languageserver-types";

export interface WalletEntity {
  _id: string;
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
  ir: number;
  enabled: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface CreateWalletDto extends Partial<WalletEntity> {}
