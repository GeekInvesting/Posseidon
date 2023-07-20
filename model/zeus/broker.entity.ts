export interface BrokerEntity {
  id: string;
  brokerName: string;
  brokerUrl: string;
  brokerEnabled: boolean;
  brokerDeleted: boolean;
  brokerCreatedAt: Date | undefined;
  brokerUpdatedAt: Date | undefined;
}

export interface CreateBrokerDto extends Partial<BrokerEntity> {}
