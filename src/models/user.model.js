const db = require('../config/db.config');
const { createNewEmployerQuery, findEmployerByEmailQuery } = require('../database/queries');
const { logger } = require('../utils/logger');

class User {
    constructor(email, password, companyname, phonenumber) {
        this.email = email;
        this.password = password;
        this.phonenumber = phonenumber;
        this.companyname = companyname;
    }

    static create(newUser, cb) {
        db.query(createNewEmployerQuery,
            [
                newUser.email,
                newUser.password,
                newUser.companyname,
                newUser.phonenumber,
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    Id: res.insertId,
                    CompanyName: newUser.companyname,
                    PhoneNumber: newUser.phonenumber,
                    Email: newUser.email
                });
        });
    }

    static findByEmail(email, cb) {
        db.query(findEmployerByEmailQuery, email, (err, res) => {
            console.log('model', err);
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res[0]);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
    }
}

module.exports = User;
