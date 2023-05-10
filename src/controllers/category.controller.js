const { logger } = require('../utils/logger');
const Category = require('../models/category.model');

exports.getAllCategories = (req, res) => {
  try {
    Category.getAll((err, result) => {
      if (err) {
        logger.error(err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        logger.info(JSON.stringify(result));
        res.status(200).json(result);
      }
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
