// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    filename: 'postgres://localhost/publications',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  },
};
