import {Operation} from "~/model/zeus/operation.entity";
import {TypeModel} from "~/model/hefesto/TypeModel";

export interface RateIrEntity {
  id: string;
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
