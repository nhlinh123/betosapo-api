const router = require('express').Router();
const { verifyToken } = require('../utils/token');
const { create: createValidators } = require('../validators/job.validator');
const { asyncHandler } = require('../middlewares/asyncHandler');
const jobController = require('../controllers/job.controller');

router
  .route('/create')
  .post(verifyToken, asyncHandler(jobController.createJob));

module.exports = router;
