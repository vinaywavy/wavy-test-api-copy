import { Migration } from '@mikro-orm/migrations';

export class Migration20221207154617 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "test" ("id" serial primary key, "name" varchar(255) not null, "description" varchar(255) null, "type" text check ("type" in (\'A\', \'B\', \'C\')) not null);',
    );
  }
}
