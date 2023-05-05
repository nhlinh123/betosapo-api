const { logger } = require("../../utils/logger");
const {
  createTableUsers,
  createTableJobs,
  createTableApplied,
  initDataUser,
} = require("../queries");
const connection = require("../../config/db.config");

(() => {
  connection.query(createTableUsers, (err, _) => {
    if (err) {
      logger.error(err.message);
      return;
    }
    logger.info("Table users created!");
  });
  connection.query(createTableJobs, (err, _) => {
    if (err) {
      logger.error(err.message);
      return;
    }
    logger.info("Table jobs created!");
  });
  connection.query(createTableApplied, (err, _) => {
    if (err) {
      logger.error(err.message);
      return;
    }
    logger.info("Table applied created!");
  });
  connection.query(initDataUser, (err, _) => {
    if (err) {
      logger.error(err.message);
    }
    logger.info("init data user admin");
    process.exit(0); // last table created then exit
  });
})();
