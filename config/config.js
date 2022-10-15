module.exports = {
  production: {
    dialect: 'sqlite',
    storage: './sqlite/production.db',
    logging: false,
  },
  development: {
    dialect: 'sqlite',
    storage: './sqlite/development.db',
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  },
};
