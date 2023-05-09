const User = require('../services/user.service');

const checkEmail = (req, res, next) => {
  const { email } = req.body;
  User.findByEmail(email, (_, data) => {
    if (data) {
      res.status(400).send({
        status: 'error',
        message: `A employer with email address '${email}' already exits`,
      });
      return;
    }
    next();
  });
};

module.exports = checkEmail;
