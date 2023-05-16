import * as dotenv from 'dotenv';

dotenv.config();

const { APP_PORT, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_SCHEMA } = process.env;

export { APP_PORT, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_SCHEMA };
