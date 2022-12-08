abstract class DynamicValueUnixTimestamps {
    startTimestampUnix: number;
    endTimestampUnix: number;
}

class DailyDynamicValues extends DynamicValueUnixTimestamps {
    startDay: string;
    endDay: string;
    dailyDynamicValueTypes: number[];
}

class DynamicEpochValues extends DynamicValueUnixTimestamps {
    startTimestamp: string;
    endTimestamp: string;
    dynamicValueTypes: number[];
}

class SourceUpdate {
    authenticationToken: string;
    partnerUserID: string;
    dataSource: number;
    createdAt?: string;
    connectionStatus?: string;
    "/v5/dailyDynamicValues"?: DailyDynamicValues
    "/v5/dynamicEpochValues"?: DynamicEpochValues
}

export class EventTriggerDto {
    sourceUpdate: SourceUpdate
}