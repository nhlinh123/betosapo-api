const Job = require('../models/job.model');
const Apply = require('../models/apply.model');
const jobMiddleware = require('../middlewares/job.middleware');
const cvMiddleware = require('../middlewares/cv.middleware');
const { createDirectory } = require('../utils/public-resource');
const { logger } = require('../utils/logger');

exports.createJob = async (req, res) => {
  try {
    // check resource was create or not
    await createDirectory();

    // parse formData using multer
    await jobMiddleware(req, res);

    // Get the properties from the formData object
    const title = req.body.title;
    const description = req.body.description;
    const companyName = req.body.companyName;
    const location = req.body.location;
    const salary = req.body.salary;
    const number = req.body.number;
    const position = req.body.position;
    const jobType = req.body.jobType;
    const status = req.body.status;
    const userId = req.body.userId;
    const categoryId = req.body.categoryId;
    const picturePath = req.files.files
      .map((file, index) => {
        const timestamp = Date.now();
        const extension = file.originalname.split('.').pop();
        const filename = `${timestamp}_${index}.${extension}`;
        const filepath = `/var/www/static-contents/${filename}`;
        // const filepath =
        //   __basedir + `/resources/static/assets/uploads/${filename}`;
        file.path = filepath;
        return filepath;
      })
      .toString();

    const newJob = new Job(
      title,
      description,
      companyName,
      location,
      salary,
      parseInt(number),
      position,
      jobType,
      status,
      parseInt(userId),
      parseInt(categoryId),
      picturePath
    );

    console.log(newJob);

    Job.create(newJob, (err, data) => {
      if (err) {
        res.status(500).send({
          code: 500,
          status: 'error',
          message: err.message,
        });
      } else {
        res.status(200).send({
          code: 200,
          status: data.status,
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: `Something went wrong!`,
    });
  }
};

exports.getNew8Jobs = (req, res) => {
  try {
    Job.getNew8Jobs((err, data) => {
      if (err) {
        res.status(500).send({
          code: 500,
          status: 'error',
          message: err.message,
        });
      } else {
        res.status(200).send({
          code: 200,
          status: data?.status,
          data: data?.res,
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Something went wrong!`,
    });
  }
};

exports.getJobsByType = (req, res) => {
  try {
    const { body } = req;
    console.log(body);
    Job.getJobsByType(body, (err, data) => {
      if (err) {
        res.status(500).send({
          code: 500,
          status: 'error',
          message: err.message,
        });
      } else {
        res.status(200).send({
          code: 200,
          status: data.status,
          data: data?.res,
        });
      }
    });
  } catch (e) {
    console.log(err);
    res.status(500).send({
      message: `Something went wrong!`,
    });
  }
};

exports.searchJobsByTypeAndTitle = (req, res) => {
  try {
    const { body } = req;
    Job.searchJobsByTypeAndTitle(body, (err, data) => {
      if (err) {
        res.status(500).send({
          code: 500,
          status: 'error',
          message: err.message,
        });
      } else {
        res.status(200).send({
          code: 200,
          status: data.status,
          data: data?.res,
          total: data?.total,
          left: data?.left,
        });
      }
    });
  } catch (e) {
    console.log(err);
    res.status(500).send({
      message: `Something went wrong!`,
    });
  }
};

exports.apply = async (req, res) => {
  try {
    await createDirectory();

    await cvMiddleware(req, res);
    const fullName = req.body.fullName;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const path = req.files.files.map((file) => file.path).toString();
    const jobId = req.body.jobId;

    const info = new Apply(fullName, phoneNumber, email, path, jobId);

    Job.apply(info, (err, data) => {
      if (err) {
        res.status(500).send({
          code: 500,
          status: 'error',
          message: err.message,
        });
      } else {
        res.status(200).send({
          code: 200,
          status: data.status,
        });
      }
    });
  } catch (e) {
    logger.error(e.message);
    res.status(500).send({
      message: `Something went wrong!`,
    });
  }
};

exports.getAllJobs = (req, res) => {
  try {
    Job.getAllJobs((err, data) => {
      if (err) {
        res.status(500).send({
          code: 500,
          status: 'error',
          message: err.message,
        });
      } else {
        res.status(200).send({
          code: 200,
          status: 'success',
          data: data,
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Something went wrong!`,
    });
  }
};

exports.getAllApplied = (req, res) => {
  try {
    Apply.getAllApplied(req.body.jobId, (err, data) => {
      if (err) {
        res.status(500).send({
          code: 500,
          status: 'error',
          message: err.message,
        });
      } else {
        res.status(200).send({
          code: 200,
          status: 'success',
          data,
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Something went wrong!`,
    });
  }
};
