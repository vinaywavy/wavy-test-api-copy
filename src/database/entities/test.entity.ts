import { Entity, Enum, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";

export enum TestType {
    A = "A",
    B = "B",
    C = "C"
}

registerEnumType(TestType, {
    name: 'TestType',
    description: 'This is a test type'
})

@Entity({ tableName: 'test' })
@ObjectType()
export class TestEntity {
    @PrimaryKey({ autoincrement: true })
    @Field(() => ID)
    id: number;

    @Property()
    @Field()
    name: string;

    @Property({ nullable: true })
    @Field({ nullable: true })
    description?: string;

    @Enum(() => TestType)
    @Field(() => TestType)
    type: TestType
}