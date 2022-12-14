import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { PersonalInformationEntity } from 'src/database/entities/personal-information.entity';
import { PersonalInformationResolver } from './personal-information.resolver';
import { PersonalInformationService } from './personal-information.service';

@Module({
  imports: [MikroOrmModule.forFeature([PersonalInformationEntity])],
  providers: [PersonalInformationService, PersonalInformationResolver],
})
export class PersonalInformationModule {}
