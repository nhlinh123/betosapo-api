const User = require('../models/user.model');
const {
  hash: hashPassword,
  compare: comparePassword,
} = require('../utils/password');
const { generate: generateToken } = require('../utils/token');

exports.signup = (req, res) => {
  const { email, password, companyname, phonenumber, type } = req.body;
  const hashedPassword = hashPassword(password.trim());

  const user = new User(
    email.trim(),
    hashedPassword,
    companyname,
    phonenumber,
    type
  );

  User.create(user, (err, data) => {
    if (err) {
      res.status(500).send({
        code: 500,
        status: 'error',
        message: err.message,
      });
    } else {
      const token = generateToken(data.id);
      res.status(201).send({
        code: 201,
        status: 'success',
        data: {
          token,
          data,
        },
      });
    }
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  console.log('controller', req.body);
  User.findByEmail(email.trim(), (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          status: 'error',
          message: `User with email ${email} was not found`,
        });
        return;
      }
      res.status(500).send({
        status: 'error',
        message: err.message,
      });
      return;
    }
    if (data) {
      if (comparePassword(password.trim(), data.Password)) {
        const token = generateToken(data.id);
        res.status(200).send({
          status: 'success',
          data: {
            token,
            email: data.Email,
            companyname: data.CompanyName,
            phonenumber: data.PhoneNumber,
          },
        });
        return;
      }
      res.status(401).send({
        status: 'error',
        message: 'Incorrect password',
      });
    }
  });
};
