import { Body, Controller, HttpCode, OnModuleInit, Post } from "@nestjs/common";
import { EventTriggerDto } from "./event-trigger.dto";
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller('thryve')
export class ThryveController implements OnModuleInit {
    constructor(
        @InjectQueue('thryve-source-updates')
        private readonly thryveSourceUpdatesQueue: Queue<EventTriggerDto>,
    ) {}

    onModuleInit() {
      console.info("onModuleInit")
        this.thryveSourceUpdatesQueue.add({
            "sourceUpdate": {
              "authenticationToken": "de3d1e068537dd927b48988cb6969abe",
              "partnerUserID": "FVMW6fp9wnUxKnfekrQduZ96Xt6gemVk",
              "dataSource": 1,
              "createdAt": "2020-02-26T16:54:30Z",
              "/v5/dailyDynamicValues": {
                "startDay": "2020-02-26",
                "endDay": "2020-02-26",
                "dailyDynamicValueTypes": [
                    2000,
                    2001,
                    2002,
                    2003,
                ],
                "startTimestampUnix": 1582675200000,
                "endTimestampUnix": 1582675200000
              },
              "/v5/dynamicEpochValues": {
                "startTimestamp": "2020-02-26T12:38:00Z",
                "endTimestamp": "2020-02-26T16:55:00Z",
                "dynamicValueTypes":[
                      1012,
                      3000,
                      3100
                   ],
                "startTimestampUnix": 1582717080000,
                "endTimestampUnix": 1582736100000
              }
            }
          })
    }

    @Post()
    @HttpCode(200)
    async eventTrigger(@Body() eventTriggerDto: EventTriggerDto): Promise<boolean> {
        console.info("eventTrigger called via webhook")
        this.thryveSourceUpdatesQueue.add(eventTriggerDto);
        return true;
    }
}