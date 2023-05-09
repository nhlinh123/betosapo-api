const Job = require('../services/job.service');

exports.createJob = (req, res) => {
  console.log(req);
  const {
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
    picturePath,
  } = req.body;

  const newJob = new Job(
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
  );

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
};
