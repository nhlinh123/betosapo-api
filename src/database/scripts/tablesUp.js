const { logger } = require('../../utils/logger');
const { createTableEmployer, createTableJobs, createTableApplied } = require('../queries');

(() => {    
   require('../../config/db.config').query(createTableEmployer, (err, _) => {
        if (err) {
            logger.error(err.message);
            return;
        }
        logger.info('Table employers created!');
    });
   require('../../config/db.config').query(createTableJobs, (err, _) => {
        if (err) {
            logger.error(err.message);
            return;
        }
        logger.info('Table jobs created!');
    });
   require('../../config/db.config').query(createTableApplied, (err, _) => {
        if (err) {
            logger.error(err.message);
            return;
        }
        logger.info('Table applied created!');
        process.exit(0); // last table created then exit
    });
})();
