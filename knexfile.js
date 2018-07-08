// Update with your config settings.
require('dotenv').config();

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host     : process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.TABLE,
      user:     process.env.DB_USER,
      password: process.env.DB_PASS,
      ssl: process.env.DB_SSL
    }
  },

  staging: {
    client: 'pg',
    connection: {
      host     : process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.TABLE,
      user:     process.env.DB_USER,
      password: process.env.DB_PASS,
      ssl: process.env.DB_SSL
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'recipe'
    }
  },

  production: {
    client: 'pg',
    connection: {
      host     : process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.TABLE,
      user:     process.env.DB_USER,
      password: process.env.DB_PASS,
      ssl: process.env.DB_SSL
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'recipe'
    }
  }

};
