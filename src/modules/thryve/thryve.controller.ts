import { Body, Controller, HttpCode, OnModuleInit, Post } from '@nestjs/common';
import { EventTriggerDto } from './event-trigger.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller('thryve')
export class ThryveController implements OnModuleInit {
  constructor(
    @InjectQueue('thryve-source-updates')
    private readonly thryveSourceUpdatesQueue: Queue<EventTriggerDto>,
  ) {}

  onModuleInit() {
    this.thryveSourceUpdatesQueue.add({
      sourceUpdate: {
        authenticationToken: 'd7badc16a90ffb36a8fdbc1e63ecff76',
        partnerUserID: 'nNsrYjmufX0q92bGDXt0E3Ugt0WPQiJf',
        dataSource: 2,
        createdAt: '2020-02-26T16:54:30Z',
        '/v5/dailyDynamicValues': {
          startDay: '2020-02-26',
          endDay: '2020-02-26',
          dailyDynamicValueTypes: [3000],
          startTimestampUnix: 1670503868,
          endTimestampUnix: 1670203868,
        },
        '/v5/dynamicEpochValues': {
          startTimestamp: '2020-02-26T12:38:00Z',
          endTimestamp: '2020-02-26T16:55:00Z',
          dynamicValueTypes: [3000],
          startTimestampUnix: 1670503868,
          endTimestampUnix: 1670203868,
        },
      },
    });
  }

  @Post()
  @HttpCode(200)
  async eventTrigger(
    @Body() eventTriggerDto: EventTriggerDto,
  ): Promise<boolean> {
    console.info('eventTrigger called via webhook');
    this.thryveSourceUpdatesQueue.add(eventTriggerDto);
    return true;
  }
}
