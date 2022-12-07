import { Options } from "@mikro-orm/core";
import { Migration20221207135435 } from "src/database/migrations/Migration20221207135435";

const config: Options = {
  allowGlobalContext: true,
  migrations: {
    pathTs: 'src/database/migrations',
    disableForeignKeys: false,
    snapshot: false,
    migrationsList: [Migration20221207135435].map((migration) => ({
      name: migration.name,
      class: migration
    }))
  },
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  dbName: 'wavyhealth',
  type: 'postgresql',
};

export default config;