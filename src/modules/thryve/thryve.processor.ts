import { Processor, Process } from '@nestjs/bull';
import { ThryveService } from './thryve.service';
import { Job } from 'bull';
import { EventTriggerDto } from './event-trigger.dto';

@Processor('thryve-source-updates')
export class ThryveProcessor {
  constructor(private readonly thryveService: ThryveService) {}

  @Process()
  async processSourceUpdates(job: Job<EventTriggerDto>) {
    const {
      authenticationToken,
      partnerUserID,
      '/v5/dailyDynamicValues': dailyDynamicValues,
      '/v5/dynamicEpochValues': dynamicEpochValues,
      connectionStatus,
    } = job.data.sourceUpdate;

    const dailyDynamicValueTypes =
      this.thryveService.getValueTypesThatMatchInterest(
        dailyDynamicValues.dailyDynamicValueTypes,
      );
    if (dailyDynamicValues && dailyDynamicValueTypes.length) {
      await this.thryveService.processDailyDynamicValues({
        authenticationToken,
        dataSources: '',
        detailed: true,
        displayTypeName: true,
        endTimestampUnix: dailyDynamicValues.endTimestampUnix.toString(),
        partnerUserId: partnerUserID,
        startTimestampUnix: dailyDynamicValues.startTimestampUnix.toString(),
        valueTypes: dailyDynamicValueTypes.join(','),
      });
    }

    const dynamicEpochValueTypes =
      this.thryveService.getValueTypesThatMatchInterest(
        dynamicEpochValues.dynamicValueTypes,
      );
    if (dynamicEpochValues && dynamicEpochValueTypes.length) {
      await this.thryveService.processDynamicEpochValues({
        authenticationToken,
        dataSources: '',
        detailed: true,
        displayTypeName: true,
        endTimestampUnix: dailyDynamicValues.endTimestampUnix.toString(),
        partnerUserId: partnerUserID,
        startTimestampUnix: dailyDynamicValues.startTimestampUnix.toString(),
        valueTypes: dailyDynamicValues.dailyDynamicValueTypes.join(','),
      });
    }

    if (connectionStatus) {
      await this.thryveService.toggleWearableConnection(
        partnerUserID,
        connectionStatus,
      );
    }
  }
}
