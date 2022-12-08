import {
  BeforeCreate,
  Entity,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PersonalInformationEntity } from './personal-information.entity';
import { v4 } from 'uuid';

@Entity({ tableName: 'user' })
@ObjectType()
export class UserEntity {
  @PrimaryKey({ autoincrement: true })
  @Field(() => ID)
  id: number;

  @OneToOne(() => PersonalInformationEntity, {
    orphanRemoval: true,
    nullable: true,
  })
  @Field(() => PersonalInformationEntity, { nullable: true })
  personalInformation?: PersonalInformationEntity;

  @Property()
  @Field()
  partnerUserId: string;

  @Property()
  @Field()
  username: string;

  @BeforeCreate()
  private generatePartnerUserId() {
    this.partnerUserId = v4();
  }
}
