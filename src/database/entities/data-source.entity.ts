import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserEntity } from './user.entity';

@Entity({ tableName: 'data_source' })
@ObjectType()
export class DataSourceEntity {
  @PrimaryKey({ autoincrement: true })
  @Field(() => ID)
  id: number;

  @ManyToOne(() => UserEntity)
  @Field(() => UserEntity)
  user: UserEntity;

  @Property()
  @Field()
  value: number;

  @Property()
  @Field()
  status: string;

  @Property()
  @Field()
  createdAt: Date;
}
