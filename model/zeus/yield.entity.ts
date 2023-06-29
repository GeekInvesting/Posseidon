import {Operation} from "~/model/zeus/operation.entity";
import {Ticket} from "~/model/hefesto/Ticket";

export interface YieldEntity {
  id: string;
  Ticket: Ticket
  ticketId: string;
  Operation: Operation;
  operationId: string;
  dateCom: Date;
  datePay: Date;
  value: number;
  quotation: number;
  income: number;
  enabled: boolean;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}

export interface CreateYieldDto extends Partial<YieldEntity> {}
