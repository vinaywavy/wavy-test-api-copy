import { Module } from "@nestjs/common";
import { ThryveService } from "./thryve.service";
import { BullModule } from '@nestjs/bull';
import { ThryveController } from "./thryve.controller";
import { ThryveProcessor } from "./thryve.processor";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { PersonalInformationEntity } from "src/database/entities/personal-information.entity";

@Module({
    imports: [
        MikroOrmModule.forFeature([PersonalInformationEntity]),
        BullModule.registerQueue({
            name: 'thryve-source-updates',
        })
    ],
    providers: [ThryveService, ThryveProcessor],
    controllers: [ThryveController]
})
export class ThryveModule {}