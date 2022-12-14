import { Processor, Process } from '@nestjs/bull';
import { ThryveService } from './thryve.service';
import { Job } from 'bull';
import { EventTriggerDto } from './event-trigger.dto';

@Processor('thryve-source-updates')
export class ThryveProcessor {
  constructor(private readonly thryveService: ThryveService) {}

  @Process()
  async processSourceUpdates(job: Job<EventTriggerDto>) {
    /**
     * Destructure values of job
     */
    const {
      authenticationToken,
      partnerUserID,
      '/v5/dailyDynamicValues': dailyDynamicValues,
      '/v5/dynamicEpochValues': dynamicEpochValues,
      connectionStatus,
      dataSource,
    } = job.data.sourceUpdate;

    /**
     * See if there are any daily dynamic values to process
     */
    const dailyDynamicValueTypes =
      this.thryveService.getValueTypesThatMatchInterest(
        dailyDynamicValues.dailyDynamicValueTypes,
      );
    if (dailyDynamicValues && dailyDynamicValueTypes.length) {
      await this.thryveService.processDailyDynamicValues({
        authenticationToken,
        dataSources: dataSource.toString(),
        detailed: true,
        displayTypeName: true,
        endTimestampUnix: dailyDynamicValues.endTimestampUnix.toString(),
        partnerUserId: partnerUserID,
        startTimestampUnix: dailyDynamicValues.startTimestampUnix.toString(),
        valueTypes: dailyDynamicValueTypes.join(','),
      });
    }

    /**
     * See if there are any epoch values to process
     */
    const dynamicEpochValueTypes =
      this.thryveService.getValueTypesThatMatchInterest(
        dynamicEpochValues.dynamicValueTypes,
      );
    if (dynamicEpochValues && dynamicEpochValueTypes.length) {
      await this.thryveService.processDynamicEpochValues({
        authenticationToken,
        dataSources: dataSource.toString(),
        detailed: true,
        displayTypeName: true,
        endTimestampUnix: dailyDynamicValues.endTimestampUnix.toString(),
        partnerUserId: partnerUserID,
        startTimestampUnix: dailyDynamicValues.startTimestampUnix.toString(),
        valueTypes: dailyDynamicValues.dailyDynamicValueTypes.join(','),
      });
    }

    /**
     * See if the connection status has to be updated of a datasource
     */
    if (connectionStatus) {
      await this.thryveService.updateWearableConnectionStatus({
        partnerUserId: partnerUserID,
        status: connectionStatus,
        dataSource,
      });
    }
  }
}
