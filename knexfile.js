module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: 'call22704',
      database: 'time'
    },
    migrations: {
      directory: './server/database/migrations'
    }
  }
}
