import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { TestEntity } from "src/database/entities/test.entity";
import { CreateTestInput } from "./create-test.input";
import { FindAllTestsArgs } from "./find-all-tests.args";
import { TestService } from "./test.service";

@Resolver(() => TestEntity)
export class TestResolver {
    constructor(
        private readonly testService: TestService
    ) {}
 
    @Query(() => [TestEntity])
    async findAllTests(@Args() { pageIndex, pageSize }: FindAllTestsArgs): Promise<TestEntity[]> {
        return this.testService.findAll(pageIndex, pageSize);
    }

    @Mutation(() => TestEntity)
    async createTest(@Args('input') input: CreateTestInput): Promise<TestEntity> {
        return this.testService.create(input);
    }
}