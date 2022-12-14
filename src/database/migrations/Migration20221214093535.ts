import { Migration } from '@mikro-orm/migrations';

export class Migration20221214093535 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "data_source" ("id" serial primary key, "user_id" int not null, "value" int not null, "status" varchar(255) not null, "created_at" timestamptz(0) not null);',
    );

    this.addSql(
      'alter table "data_source" add constraint "data_source_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "user" rename column "partner_user_id" to "password";',
    );

    this.addSql(
      'alter table "personal_information" drop column "is_wearable_connected";',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "data_source" cascade;');

    this.addSql(
      'alter table "personal_information" add column "is_wearable_connected" varchar null default null;',
    );

    this.addSql(
      'alter table "user" rename column "password" to "partner_user_id";',
    );
  }
}
