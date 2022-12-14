import { Module } from '@nestjs/common';
import { ThryveService } from './thryve.service';
import { BullModule } from '@nestjs/bull';
import { ThryveController } from './thryve.controller';
import { ThryveProcessor } from './thryve.processor';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PersonalInformationEntity } from 'src/database/entities/personal-information.entity';
import { DataSourceEntity } from 'src/database/entities/data-source.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([PersonalInformationEntity, DataSourceEntity]),
    BullModule.registerQueue({
      name: 'thryve-source-updates',
    }),
  ],
  providers: [ThryveService, ThryveProcessor],
  controllers: [ThryveController],
})
export class ThryveModule {}
