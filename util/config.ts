import * as dotenv from 'dotenv';
dotenv.config();

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      JWT_SECRET: string;
      // DATABASE_HOST: string;
      // DATABASE_NAME: string;
      // DATABASE_USERNAME: string;
      // DATABASE_PASSWORD: string;
    }
  }
}

const { DATABASE_URL, JWT_SECRET } = process.env;

export { DATABASE_URL, JWT_SECRET };
