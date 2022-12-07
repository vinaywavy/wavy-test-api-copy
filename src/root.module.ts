import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { GraphQLModule } from '@nestjs/graphql';
import { TestModule } from './modules/test/test.module';
import { ThryveModule } from './modules/thryve/thryve.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MikroOrmModule.forRoot(),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    BullModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        redis: {
          host: config.get<string>('REDIS_HOST'),
          port: config.get<number>('REDIS_PORT'),
          password: config.get<string>('REDIS_PASSWORD')
        }
      }),
      inject: [ConfigService]
    }),
    TestModule,
    ThryveModule
  ],
})
export class RootModule {}
