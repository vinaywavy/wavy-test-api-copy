import { Resolver, Query, Args } from '@nestjs/graphql';
import { PersonalInformationEntity } from 'src/database/entities/personal-information.entity';
import { FindAllPersonalInformationArgs } from './find-all-personal-information.args';
import { PersonalInformationService } from './personal-information.service';

@Resolver(() => PersonalInformationEntity)
export class PersonalInformationResolver {
  constructor(
    private readonly personalInformationService: PersonalInformationService,
  ) {}

  @Query(() => [PersonalInformationEntity])
  async findAllPersonalInformation(
    @Args() { pageIndex, pageSize }: FindAllPersonalInformationArgs,
  ): Promise<PersonalInformationEntity[]> {
    return this.personalInformationService.findAll(pageIndex, pageSize);
  }
}
