import { Field, InputType } from "@nestjs/graphql";
import { TestType } from "src/database/entities/test.entity";

@InputType()
export class CreateTestInput {
    @Field()
    name: string;

    @Field({ nullable: true })
    description?: string;

    @Field(() => TestType)
    type: TestType
}