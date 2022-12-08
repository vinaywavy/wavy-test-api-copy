import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UserEntity } from 'src/database/entities/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity])],
  providers: [UserService, UserResolver],
})
export class UserModule {}
