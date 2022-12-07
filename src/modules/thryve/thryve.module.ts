import { Module } from "@nestjs/common";
import { ThryveService } from "./thryve.service";
import { BullModule } from '@nestjs/bull';
import { ThryveController } from "./thryve.controller";

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'thryve-source-updates'
        })
    ],
    providers: [ThryveService],
    controllers: [ThryveController]
})
export class ThryveModule {}