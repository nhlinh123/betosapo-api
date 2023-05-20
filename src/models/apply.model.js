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

  static getAllApplied(data, cb) {
    const { jobId, categoryId, jobType } = data;
    let query =
      'select a.FullName, a.Email, a.PhoneNumber, a.Path, j.CompanyName, j.JobType, j.Position, c.Name as CategoryName from Applied as a ' +
      'inner join Jobs as j on j.Id = a.JobId ' +
      'inner join Categories as c on c.Id = j.CategoryId ';
    if (jobId && jobId !== 0) {
      query += ` WHERE j.Id = ${jobId}`;
    }
    if (categoryId && categoryId !== 0) {
      if (query.includes('WHERE')) {
        query += ` AND j.CategoryId = ${categoryId}`;
      } else {
        query += ` WHERE j.CategoryId = ${categoryId}`;
      }
    }
    if (jobType && jobType !== '') {
      if (query.includes('WHERE')) {
        query += ` AND j.JobType = '${jobType}'`;
      } else {
        query += ` WHERE j.JobType = '${jobType}'`;
      }
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
