import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserEntity } from './user.entity';

@Entity({ tableName: 'personal_information' })
@ObjectType()
export class PersonalInformationEntity {
  @PrimaryKey({ autoincrement: true })
  @Field(() => ID)
  id: number;

  @OneToOne(() => UserEntity, { owner: true })
  @Field(() => UserEntity)
  user: UserEntity;

  @Property({ nullable: true })
  @Field({ nullable: true })
  isWearableConnected?: string;

  @Property({ nullable: true })
  @Field({ nullable: true })
  lastMeasurementAt?: Date;
}
