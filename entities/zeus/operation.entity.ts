export interface Operation {
  _id: string;
  operationName: string;
  operationSystem: string;
  operationEnabled: boolean;
  operationDeleted: boolean;
  operationCreatedAt: Date | undefined;
  operationUpdatedAt: Date | undefined;
}
