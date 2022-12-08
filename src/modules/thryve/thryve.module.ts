import { Module } from "@nestjs/common";
import { ThryveService } from "./thryve.service";
import { BullModule } from '@nestjs/bull';
import { ThryveController } from "./thryve.controller";
import { ThryveProcessor } from "./thryve.processor";

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'thryve-source-updates',
        })
    ],
    providers: [ThryveProcessor, ThryveService],
    controllers: [ThryveController]
})
export class ThryveModule {}