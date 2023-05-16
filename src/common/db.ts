import { Sequelize } from 'sequelize';

import { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_SCHEMA } from '../config/config.default';

const db = new Sequelize({
  dialect: 'mysql',
  database: DB_SCHEMA,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: Number(DB_PORT),
});

/**
 * DB Connection Testing
 */
/*
db.authenticate()
  .then(() => {
    console.log('Database connection succeeded');
  })
  .catch((e) => {
    console.error('Database connection failed:', e);
  });
*/

export default db;
