const { logger } = require('../../utils/logger');
const {
  createTableUsers,
  createTableJobs,
  createTableApplied,
  createTableCategories,
  initDataUser,
  initDataCategoryData,
} = require('../queries');
const connection = require('../../config/db.config');

(() => {
  connection.query(createTableUsers, (err, _) => {
    if (err) {
      logger.error(err.message);
    } else {
      logger.info('Table users created!');
    }
  });
  connection.query(createTableCategories, (err, _) => {
    if (err) {
      logger.error(err.message);
    } else {
      logger.info('Table categories created!');
    }
  });
  connection.query(createTableJobs, (err, _) => {
    if (err) {
      logger.error(err.message);
    } else {
      logger.info('Table jobs created!');
    }
  });
  connection.query(createTableApplied, (err, _) => {
    if (err) {
      logger.error(err.message);
    } else {
      logger.info('Table applied created!');
    }
  });
  connection.query(initDataUser, (err, _) => {
    if (err) {
      logger.error(err.message);
    } else {
      logger.info('init data user admin');
    }
  });
  connection.query(initDataCategoryData, (err, _) => {
    if (err) {
      logger.error(err.message);
    } else {
      logger.info('init data delivery category');
    }
    process.exit(0); // last table created then exit
  });
})();
