import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export abstract class FindArgs {
  @Field(() => Int)
  pageIndex: number;

  @Field(() => Int)
  pageSize: number;
}
