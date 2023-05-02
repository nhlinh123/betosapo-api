const { DB_NAME } = require('../utils/secrets')

const createDB = `CREATE DATABASE IF NOT EXISTS ${DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`;

const dropDB = `DROP DATABASE IF EXISTS ${DB_NAME}`;

const createTableEmployer = `
CREATE TABLE IF NOT EXISTS Employers (
    Id BIGINT PRIMARY KEY AUTO_INCREMENT,
    CreatedDate TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    Email VARCHAR(255) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    CompanyName VARCHAR(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    PhoneNumber VARCHAR(20) NOT NULL
);
`;

const createTableJobs = `
CREATE TABLE IF NOT EXISTS Jobs (
    Id BIGINT PRIMARY KEY AUTO_INCREMENT,
    CreatedDate TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    Title VARCHAR(255) NOT NULL UNIQUE,
    Description VARCHAR(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    CompanyName VARCHAR(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    Salary VARCHAR(20) NOT NULL,
    Position VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    JobType VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    EmployerId BIGINT NOT NULL,
    FOREIGN KEY (EmployerId) REFERENCES Employers(Id),
    PicturePath VARCHAR(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
)
`;

const createTableApplied = `
CREATE TABLE IF NOT EXISTS Applied (
    Id BIGINT PRIMARY KEY AUTO_INCREMENT,
    CreatedDate TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    Email VARCHAR(255) NOT NULL UNIQUE,
    FullName VARCHAR(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    PhoneNumber VARCHAR(20) NOT NULL,
    Path VARCHAR(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    JobId BIGINT NOT NULL,
    FOREIGN KEY (JobId) REFERENCES Jobs(Id)
)
`;

const createNewEmployerQuery = `
INSERT INTO Employers VALUE(null, NOW(), ?, ?, ?, ?);
`;

const findEmployerByEmailQuery = `
SELECT * FROM Employers WHERE Email = ?
`;

module.exports = {
    createDB,
    dropDB,
    createTableEmployer,
    createTableJobs,
    createTableApplied,
    createNewEmployerQuery,
    findEmployerByEmailQuery
};
