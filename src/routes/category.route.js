const router = require('express').Router();
const { verifyToken } = require('../utils/token');
const { asyncHandler } = require('../middlewares/asyncHandler');
const categoryController = require('../controllers/category.controller');

router
  .route('/getAll')
  .get(verifyToken, asyncHandler(categoryController.getAllCategories));

module.exports = router;
