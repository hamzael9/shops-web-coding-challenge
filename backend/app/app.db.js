const winston = require('winston');

const mongoose = require('mongoose');


module.exports = async (db) => {

  const dbConfigs = require('./config/db')[db];
  if (!dbConfigs) {
    winston.error(`DB setup: Could not load configs for the provided DB: '${db.toLowerCase()}'`);
    return;
  }

  const dbEnvConfig = dbConfigs[process.env.NODE_ENV || 'dev'];

  if (db.toLowerCase() === 'mongo') {
    await setupMongoDB(dbEnvConfig);
  } else {
    winston.error(`DB setup: Database provided : '${db.toLowerCase()}' is not supported`);
  }

};

const setupMongoDB = async (dbEnvConfig) => {
  const MONGO_DB_URL = `mongodb://${dbEnvConfig.DB_HOST}/${dbEnvConfig.DB_NAME}`;
  try {
    await mongoose.connect(MONGO_DB_URL);
    winston.info('Mongoose connected successfully to DB !');
  } catch (err) {
    winston.error(`Mongoose failed to connect to : ${MONGO_DB_URL}`);
    winston.debug(err);
  }
};
