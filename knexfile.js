// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'recipe',
      user:     'vagrant',
      password: 'vagrant'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'recipe',
      user:     'vagrant',
      password: 'vagrant'
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
    client: 'postgresql',
    connection: {
      database: 'recipe',
      user:     'vagrant',
      password: 'vagrant'
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
