const db = require('../config/db.config');
const { logger } = require('../utils/logger');
const { getAllCategories } = require('../repositories/category.repository');
class Category {
  constructor(name) {
    this.name = name;
  }

  static getAll(cb) {
    db.query(getAllCategories, (err, res) => {
      if (err) {
        logger.error(err.message);
        cb(err, null);
        return;
      }
      cb(null, {
        status: 'success',
        data: res,
      });
    });
  }
}

module.exports = Category;
