class DailyDynamicValues {
    startDay: string;
    endDay: string;
    dailyDynamicValueTypes: number[];
}

class DynamicEpochValues {
    startTimestamp: string;
    endTimestamp: string;
    startTimestampUnix: number;
    endTimestampUnix: number;
    dynamicValueTypes: number[];
}

class SourceUpdate {
    authenticationToken: string;
    partnerUserID: string;
    dataSource: number;
    createdAt?: Date;
    connectionStatus?: string;
    "/v5/dailyDynamicValues"?: DailyDynamicValues
    "/v5/dynamicEpochValues"?: DynamicEpochValues
}

export class EventTriggerDto {
    sourceUpdate: SourceUpdate
}