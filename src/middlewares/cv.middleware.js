const util = require('util');
const multer = require('multer');
const maxSize = 5 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/var/www/static-contents/cv');
    // cb(null, __basedir + '/resources/static/assets/uploads/');
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
  { name: 'fullName', maxCount: 1 },
  { name: 'phoneNumber', maxCount: 1 },
  { name: 'email', maxCount: 1 },
  { name: 'jobId', maxCount: 1 },
  { name: 'files', maxCount: 1 },
]);

let cvMiddleware = util.promisify(readFormData);
module.exports = cvMiddleware;
