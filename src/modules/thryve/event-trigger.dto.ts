export enum ConnectionStatus {
  NEW = 'NEW',
  DELETED = 'DELETED',
}

export enum UpdateType {
  DAILY = 'DAILY',
  MINUTE = 'MINUTE',
  BOTH = 'BOTH',
}

export abstract class DynamicValueUnixTimestamps {
  startTimestampUnix: number;
  endTimestampUnix: number;
}

export class DailyDynamicValues extends DynamicValueUnixTimestamps {
  startDay: string;
  endDay: string;
  dailyDynamicValueTypes: number[];
}

export class DynamicEpochValues extends DynamicValueUnixTimestamps {
  startTimestamp: string;
  endTimestamp: string;
  dynamicValueTypes: number[];
}

export class SourceUpdate {
  authenticationToken: string;
  partnerUserID: string;
  dataSource: number;
  createdAt?: string;
  connectionStatus?: ConnectionStatus;
  updateType?: UpdateType;
  '/v5/dailyDynamicValues'?: DailyDynamicValues;
  '/v5/dynamicEpochValues'?: DynamicEpochValues;
}

export class EventTriggerDto {
  sourceUpdate: SourceUpdate;
}
