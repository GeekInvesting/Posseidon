export interface Operation {
  id: string;
  operationName: string;
  operationSystem: string;
  operationEnabled: boolean;
  operationDeleted: boolean;
  operationCreatedAt: Date | undefined;
  operationUpdatedAt: Date | undefined;
}

export interface CreateOperationDto extends Partial<Operation> {};
