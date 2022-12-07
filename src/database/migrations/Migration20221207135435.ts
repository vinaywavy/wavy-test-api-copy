import { Migration } from '@mikro-orm/migrations';

export class Migration20221207135435 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `test` (`id` integer not null primary key autoincrement, `name` text not null, `description` text null, `type` text check (`type` in (\'A\', \'B\', \'C\')) not null);');
  }

}
