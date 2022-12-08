import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { TestEntity } from "src/database/entities/test.entity";
import { UserEntity } from "src/database/entities/user.entity";
import { CreateUserInput } from "./create-user.input";
import { FindAllUsersArgs } from "./find-all-users.args";
import { UserService } from "./user.service";

@Resolver(() => UserEntity)
export class UserResolver {
    constructor(
        private readonly userService: UserService
    ) {}
 
    @Query(() => [UserEntity])
    async findAllUsers(@Args() { pageIndex, pageSize }: FindAllUsersArgs): Promise<UserEntity[]> {
        return this.userService.findAll(pageIndex, pageSize);
    }

    @Mutation(() => UserEntity)
    async createUser(@Args('input') input: CreateUserInput): Promise<UserEntity> {
        return this.userService.create(input);
    }
}