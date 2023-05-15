const db = require('../config/db.config');
const { logger } = require('../utils/logger');

class Apply {
  constructor(fullName, phoneNumber, email, path, jobId) {
    this.fullName = fullName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.path = path;
    this.jobId = Number(jobId);
  }

  static getAllApplied(jobId = null, cb) {
    let query = 'SELECT * FROM Applied';
    const id = Number(jobId);
    if (id && id !== 0 && id !== '0') {
      query += ` WHERE jobId = ${jobId}`;
    }
    db.query(query, (err, result) => {
      if (err) {
        logger.error(err);
        return;
      }
      cb(null, result);
      logger.info(result);
    });
  }
}

module.exports = Apply;
