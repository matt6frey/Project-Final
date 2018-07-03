// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'recipe',
      user:     'postgres',
      password: 'postgres'
    }
  },

  staging: {
    client: 'pg',
    connection: {
      database: 'recipe',
      user:     'postgres',
      password: 'postgres'
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
      user:     'postgres',
      password: 'postgres'
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
