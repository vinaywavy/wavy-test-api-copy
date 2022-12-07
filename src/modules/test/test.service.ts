import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/sqlite";
import { Injectable } from "@nestjs/common";
import { TestEntity } from "src/database/entities/test.entity";
import { CreateTestInput } from "./create-test.input";

@Injectable()
export class TestService {
    constructor(
        @InjectRepository(TestEntity)
        private readonly testRepository: EntityRepository<TestEntity>
    ) {}

    async findAll(pageIndex: number = 0, pageSize: number = 10): Promise<TestEntity[]> {
        return this.testRepository.find({}, { limit: pageSize, offset: pageIndex * pageSize });
    }

    async create(input: CreateTestInput): Promise<TestEntity> {
        const test = this.testRepository.create({
            ...input
        })
        await this.testRepository.persistAndFlush(test)
        return test;
    }
}