import { MikroORM } from '@mikro-orm/core';
import { NestFactory } from '@nestjs/core';
import { RootModule } from './root.module';

async function bootstrap() {
  const app = await NestFactory.create(RootModule);

  const orm = app.get(MikroORM);
  const migrator = orm.getMigrator();
  await migrator.up();

  await app.listen(3000);
}
bootstrap();
