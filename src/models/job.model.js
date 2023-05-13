const db = require('../config/db.config');
const { logger } = require('../utils/logger');
const {
  createNewJobRepo,
  getNew8Jobs,
  getJobsByType,
} = require('../repositories/job.repository');
class Job {
  constructor(
    title,
    description,
    companyName,
    location,
    salary,
    number,
    position,
    jobType,
    status,
    userId,
    categoryId,
    picturePath
  ) {
    this.title = title;
    this.description = description;
    this.companyName = companyName;
    this.location = location;
    this.salary = salary;
    this.number = number;
    this.position = position;
    this.jobType = jobType;
    this.status = status;
    this.userId = userId;
    this.categoryId = categoryId;
    this.picturePath = picturePath;
  }

  static create(newJob, cb) {
    logger.info('models', JSON.stringify(newJob));
    db.query(
      createNewJobRepo,
      [
        newJob.title,
        newJob.description,
        newJob.companyName,
        newJob.location,
        newJob.salary,
        newJob.number,
        newJob.position,
        newJob.jobType,
        newJob.status,
        newJob.userId,
        newJob.categoryId,
        newJob.picturePath,
      ],
      (err, res) => {
        if (err) {
          logger.error(err.message);
          cb(err, null);
          return;
        }
        cb(null, {
          status: 'success',
        });
      }
    );
  }

  static getNew8Jobs(cb) {
    db.query(getNew8Jobs, (err, res) => {
      if (err) {
        logger.error(err.message);
        cb(err, null);
      }
      cb(null, {
        res,
      });
    });
  }

  static getJobsByType(req, cb) {
    logger.info('req', JSON.stringify(req));
    db.query(getJobsByType, [req.type, req.limit, req.offset], (err, res) => {
      if (err) {
        logger.error(err.message);
        cb(err, null);
      }
      console.log(res);
      cb(null, {
        res,
      });
    });
  }
}

module.exports = Job;
