import dotenv from 'dotenv';
import { Dialect } from 'sequelize';

dotenv.config();

const config: { [key: string]: any } = {
  username: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT!),
  dialect: process.env.DB_DIALECT! as Dialect || 'postgres',
};

if(process.env.DB_SSL === 'true') {
  config.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
}

export default config;
