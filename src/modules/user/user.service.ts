import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/database/entities/user.entity';
import { CreateUserInput } from './create-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: EntityRepository<UserEntity>,
  ) {}

  async findAll(pageIndex = 0, pageSize = 10): Promise<UserEntity[]> {
    return this.userRepository.find(
      {},
      { limit: pageSize, offset: pageIndex * pageSize },
    );
  }

  async create(input: CreateUserInput): Promise<UserEntity> {
    const user = this.userRepository.create({
      ...input,
    });
    await this.userRepository.persistAndFlush(user);
    return user;
  }
}
