const util = require('util');
const multer = require('multer');
const maxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + '/resources/static/assets/uploads/');
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});

let readFormData = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).fields([
  { name: 'title', maxCount: 1 },
  { name: 'description', maxCount: 1 },
  { name: 'companyName', maxCount: 1 },
  { name: 'location', maxCount: 1 },
  { name: 'salary', maxCount: 1 },
  { name: 'number', maxCount: 1 },
  { name: 'position', maxCount: 1 },
  { name: 'jobType', maxCount: 1 },
  { name: 'status', maxCount: 1 },
  { name: 'userId', maxCount: 1 },
  { name: 'categoryId', maxCount: 1 },
  { name: 'files', maxCount: 10 },
]);

let jobMiddleware = util.promisify(readFormData);
module.exports = jobMiddleware;
