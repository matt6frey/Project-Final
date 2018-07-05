// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'recipe',
      user:     process.env.DB_USER,
      password: process.env.DB_PASS
    }
  },

  staging: {
    client: 'pg',
    connection: {
      database: 'recipe',
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
      database: 'recipe',
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
