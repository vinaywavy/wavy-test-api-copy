import dotenv from 'dotenv';
import { Options } from '@mikro-orm/core';
import { Migration20221207154617 } from 'src/database/migrations/Migration20221207154617';
import { Migration20221208110347 } from 'src/database/migrations/Migration20221208110347';
import { Migration20221214093535 } from 'src/database/migrations/Migration20221214093535';

dotenv.config();

const config: Options = {
  allowGlobalContext: true,
  migrations: {
    pathTs: 'src/database/migrations',
    disableForeignKeys: false,
    snapshot: false,
    migrationsList: [
      Migration20221207154617,
      Migration20221208110347,
      Migration20221214093535,
    ].map((migration) => ({
      name: migration.name,
      class: migration,
    })),
  },
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  host: process.env.POSTGRES_DATABASE_HOST,
  user: process.env.POSTGRES_DATABASE_USER,
  password: process.env.POSTGRES_DATABASE_PASSWORD,
  port: Number(process.env.POSTGRES_DATABASE_PORT),
  dbName: process.env.POSTGRES_DATABASE_NAME,
  type: 'postgresql',
};

export default config;
