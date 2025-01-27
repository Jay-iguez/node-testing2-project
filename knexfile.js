// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const common = {
  client: 'sqlite3',
  useNullAsDefault: true,
  migrations: { directory: './data/migrations'},
  seeds: { directory: './data/seeds'}
}
module.exports = {
  development: {
    ...common,
    connection: {
      filename: './data/dogs.db3'
    }
  },
  testing: {
    ...common,
    connection: {
      filename: './data/testing.db3'
    }
  },
  production: {
    
  }
  /**
   * development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/dogs.db3'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done)
      }
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },
  testing: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/testing.db3'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done)
      }
    },
    migrations: {
      tableName: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  }
   * 
   */
  

};
