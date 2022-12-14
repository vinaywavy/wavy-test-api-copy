import {
  Collection,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PersonalInformationEntity } from './personal-information.entity';
import { DataSourceEntity } from './data-source.entity';

@Entity({ tableName: 'user' })
@ObjectType()
export class UserEntity {
  @PrimaryKey({ autoincrement: true })
  @Field(() => ID)
  id: number;

  @OneToMany(() => DataSourceEntity, (dataSource) => dataSource.user)
  @Field(() => [DataSourceEntity])
  dataSources = new Collection<DataSourceEntity>(this);

  @OneToOne(() => PersonalInformationEntity, {
    orphanRemoval: true,
    nullable: true,
  })
  @Field(() => PersonalInformationEntity, { nullable: true })
  personalInformation?: PersonalInformationEntity;

  @Property()
  @Field()
  username: string;

  @Property()
  password: string;
}
