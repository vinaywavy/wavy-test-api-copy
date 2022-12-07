import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TestModule } from './modules/test/test.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    TestModule
  ],
})
export class RootModule {}
