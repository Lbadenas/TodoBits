import { config as dotenvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

dotenvConfig({ path: '.env' });

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Ajusta la ruta de las entidades
  synchronize: true,
  dropSchema: false, // Considera desactivar esto en producción
  logging: true,
  migrationsRun: false,
};

export const typeOrmConfig = registerAs('typeorm', () => config);
