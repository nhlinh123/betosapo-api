const fs = require('fs');
const { logger } = require('../utils/logger');
exports.createDirectory = async () => {
  const directory = __basedir + '\\resources\\static\\assets\\uploads';

  if (!fs.existsSync(directory)) {
    try {
      fs.mkdirSync(directory, { recursive: true });
      logger.info('create public resource successfully!');
    } catch (e) {
      logger.error(e);
    }
  }
};
