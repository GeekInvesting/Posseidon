
export interface YieldEntity {
  id: string;
  ticketId: string;
  operationId: string;
  dateCom: Date | undefined;
  datePay: Date | undefined;
  value: number;
  quotation: number;
  income: number;
  enabled: boolean;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}

export interface CreateYieldDto extends Partial<YieldEntity> {}
