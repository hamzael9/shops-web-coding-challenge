module.exports = {
  'dev' : {
    HTTP_PORT: 8080,
    HTTP_LOGGER_FORMAT: 'dev',
    SESSION_SECRET: 'secret'
  },
  'test' : {
    HTTP_PORT: 8080,
    HTTP_LOGGER_FORMAT: 'dev',
    SESSION_SECRET: 'secret'
  },
  'prod' : {
    HTTP_PORT: 80,
    HTTP_LOGGER_FORMAT: 'common',
    SESSION_SECRET: 'secret'
  }
}
