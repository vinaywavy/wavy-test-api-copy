import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import { PersonalInformationEntity } from 'src/database/entities/personal-information.entity';

@Injectable()
export class PersonalInformationService {
  constructor(
    @InjectRepository(PersonalInformationEntity)
    private readonly personalInformationRepository: EntityRepository<PersonalInformationEntity>,
  ) {}

  async findAll(
    pageIndex = 0,
    pageSize = 10,
  ): Promise<PersonalInformationEntity[]> {
    return this.personalInformationRepository.find(
      {},
      { limit: pageSize, offset: pageIndex * pageSize },
    );
  }
}
