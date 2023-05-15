const db = require('../config/db.config');
const { logger } = require('../utils/logger');
const {
  createNewJobRepo,
  getNew8Jobs,
  getJobsByType,
  applyJob,
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
        status: 'success',
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

  static searchJobsByTypeAndTitle(req, cb) {
    logger.info('req', JSON.stringify(req));
    let query = `SELECT COUNT(*) AS total FROM Jobs `;
    query = this.addQueryForSearchJobs(query, req);
    db.query(query, (err, countResult) => {
      if (err) {
        logger.error(err.message);
        cb(err, null);
        return;
      }
      const total = countResult[0].total;
      let searchQuery = `SELECT * FROM Jobs `;
      searchQuery = this.addQueryForSearchJobs(searchQuery, req);
      searchQuery += 'ORDER BY CreatedDate DESC ';
      searchQuery += `LIMIT ${req.limit} OFFSET ${req.offset}`;
      db.query(searchQuery, (err, searchResult) => {
        if (err) {
          logger.error(err.message);
          cb(err, null);
          return;
        }
        const left = total - (req.offset + searchResult.length);
        cb(null, {
          total,
          left,
          res: searchResult,
        });
      });
    });
  }

  static addQueryForSearchJobs(query, req) {
    if (req.categoryId && req.categoryId !== 0) {
      query += ` WHERE CategoryId = ${req.categoryId} `;
    }
    if (req.title && req.title !== '') {
      if (query.includes('WHERE')) {
        query += ` AND Title LIKE '%${req.title}%' `;
      } else {
        query += ` WHERE Title LIKE '%${req.title}%' `;
      }
    }
    return query;
  }

  static apply(info, cb) {
    logger.info('models', JSON.stringify(info));
    db.query(
      applyJob,
      [info.fullName, info.phoneNumber, info.email, info.path, info.jobId],
      (err, res) => {
        if (err) {
          logger.error(err.message);
          cb(err, null);
          return;
        }
        cb(null, {
          status: 'success',
          data: res,
        });
      }
    );
  }
}

module.exports = Job;
