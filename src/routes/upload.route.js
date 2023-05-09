const router = require("express").Router();
const {verifyToken} = require("../utils/token");
const {asyncHandler} = require("../middlewares/asyncHandler");
const uploadController = require('../controllers/upload.controller');

router.route('/upload')
    .post(verifyToken, asyncHandler(uploadController.upload));

module.exports = router;
