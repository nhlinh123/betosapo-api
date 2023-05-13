const Job = require('../models/job.model');
const jobMiddleware = require('../middlewares/job.middleware');
const { createDirectory } = require('../utils/public-resource');

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
    const picturePath = req.files.files.map((file) => file.path).toString();

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
