import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { TestEntity } from "src/database/entities/test.entity";
import { TestResolver } from "./test.resolver";
import { TestService } from "./test.service";

@Module({
    imports: [MikroOrmModule.forFeature([TestEntity])],
    providers: [TestService, TestResolver]
})
export class TestModule {}