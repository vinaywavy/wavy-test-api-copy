import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { EventTriggerDto } from "./event-trigger.dto";
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller('thryve')
export class ThryveController {
    constructor(
        @InjectQueue('thryve-source-updates')
        private readonly thryveSourceUpdatesQueue: Queue<EventTriggerDto>,
    ) {}

    @Post()
    @HttpCode(200)
    async eventTrigger(@Body() eventTriggerDto: EventTriggerDto): Promise<boolean> {
        this.thryveSourceUpdatesQueue.add(eventTriggerDto);
        return true;
    }
}