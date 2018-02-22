module.exports = {
  'dev' : {
    HTTP_PORT: 8080,
    HTTP_LOGGER_FORMAT: 'dev',
    JWT_SECRET: 'secret'
  },
  'test' : {
    HTTP_PORT: 8080,
    HTTP_LOGGER_FORMAT: 'dev',
    JWT_SECRET: 'secret'
  },
  'prod' : {
    HTTP_PORT: 80,
    HTTP_LOGGER_FORMAT: 'common',
    JWT_SECRET: 'secret'
  }
}
