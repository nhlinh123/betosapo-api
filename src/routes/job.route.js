const router = require('express').Router();
const { verifyToken } = require('../utils/token');
const { create: createValidators } = require('../validators/job.validator');
const { asyncHandler } = require('../middlewares/asyncHandler');
const jobController = require('../controllers/job.controller');

router
  .route('/create')
  .post(verifyToken, asyncHandler(jobController.createJob));

router.route('/getNewestJobs').get(asyncHandler(jobController.getNew8Jobs));
router.route('/getJobsByType').post(asyncHandler(jobController.getJobsByType));
router
  .route('/searchJobsByTypeAndTitle')
  .post(asyncHandler(jobController.searchJobsByTypeAndTitle));
router.route('/apply').post(asyncHandler(jobController.apply));

module.exports = router;
