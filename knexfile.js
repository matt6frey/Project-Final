// Update with your config settings.
require('dotenv').config();

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: process.env.TABLE,
      user:     process.env.DB_USER,
      password: process.env.DB_PASS
    }
  },

  staging: {
    client: 'pg',
    connection: {
      database: process.env.TABLE,
      user:     process.env.DB_USER,
      password: process.env.DB_PASS
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
      database: process.env.TABLE,
      user:     process.env.DB_USER,
      password: process.env.DB_PASS
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
