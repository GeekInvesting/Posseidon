import {Operation} from "~/entities/zeus/operation.entity";
import {TypeModel} from "~/entities/hefesto/TypeModel";

export interface RateIrEntity {
  _id: string;
  system: string;
  operationId: string;
  Operation: Operation;
  typeId: string;
  Type: TypeModel;
  rate: number;
  limit: number;
  valid: Date | string;
  enabled: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface CreateRateIrDto extends Partial<RateIrEntity> {}
