import { Migration } from '@mikro-orm/migrations';

export class Migration20221208110347 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "personal_information_id" int null, "partner_user_id" varchar(255) not null, "username" varchar(255) not null);');
    this.addSql('alter table "user" add constraint "user_personal_information_id_unique" unique ("personal_information_id");');

    this.addSql('create table "personal_information" ("id" serial primary key, "user_id" int not null, "is_wearable_connected" varchar(255) null, "last_measurement_at" timestamptz(0) null);');
    this.addSql('alter table "personal_information" add constraint "personal_information_user_id_unique" unique ("user_id");');

    this.addSql('alter table "user" add constraint "user_personal_information_id_foreign" foreign key ("personal_information_id") references "personal_information" ("id") on update cascade on delete set null;');

    this.addSql('alter table "personal_information" add constraint "personal_information_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "personal_information" drop constraint "personal_information_user_id_foreign";');

    this.addSql('alter table "user" drop constraint "user_personal_information_id_foreign";');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "personal_information" cascade;');
  }

}
