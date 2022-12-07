import { Processor, Process } from '@nestjs/bull';
import { ThryveService } from './thryve.service';
import { Job } from 'bull';
import { EventTriggerDto } from './event-trigger.dto';


@Processor('thryve-source-updates')
export class ThryveProcessor {
    constructor(
        private readonly thryveService: ThryveService
    ) {}

    @Process()
    async processSourceUpdates(job: Job<EventTriggerDto>) {
        console.info(job);
    }
}