import { Body, Controller, HttpCode, OnModuleInit, Post } from '@nestjs/common';
import { EventTriggerDto } from './event-trigger.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { ThryveAuth } from 'src/common/decorator/thryve-auth.decorator';

@Controller('thryve')
export class ThryveController implements OnModuleInit {
  constructor(
    @InjectQueue('thryve-source-updates')
    private readonly thryveSourceUpdatesQueue: Queue<EventTriggerDto>,
  ) {}

  onModuleInit() {
    // TODO: Remove example EventTrigger
    // this.thryveSourceUpdatesQueue.add({
    //   sourceUpdate: {
    //     authenticationToken: 'd7badc16a90ffb36a8fdbc1e63ecff76',
    //     partnerUserID: 'nNsrYjmufX0q92bGDXt0E3Ugt0WPQiJf',
    //     dataSource: 2,
    //     createdAt: '2020-02-26T16:54:30Z',
    //     '/v5/dailyDynamicValues': {
    //       startDay: '2022-12-05',
    //       endDay: '2022-12-08',
    //       dailyDynamicValueTypes: [
    //         6010, 6011, 6012, 6013, 5050, 2000, 2001, 2002, 2003, 1012, 3000,
    //         3100, 1115, 1114,
    //       ],
    //       startTimestampUnix: 1670203868000,
    //       endTimestampUnix: 1670503868000,
    //     },
    //     '/v5/dynamicEpochValues': {
    //       startTimestamp: '2022-12-05T00:00:00Z',
    //       endTimestamp: '2022-12-08T00:00:00Z',
    //       dynamicValueTypes: [
    //         6010, 6011, 6012, 6013, 5050, 2000, 2001, 2002, 2003, 1012, 3000,
    //         3100, 1115, 1114,
    //       ],
    //       startTimestampUnix: 1670503868000,
    //       endTimestampUnix: 1670203868000,
    //     },
    //   },
    // });
  }

  @Post()
  @HttpCode(200)
  @ThryveAuth()
  async eventTrigger(
    @Body() eventTriggerDto: EventTriggerDto,
  ): Promise<boolean> {
    this.thryveSourceUpdatesQueue.add(eventTriggerDto);
    return true;
  }
}
