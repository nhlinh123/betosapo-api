const { DB_NAME } = require('../utils/secrets');

const createDB = `CREATE DATABASE IF NOT EXISTS ${DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`;

const dropDB = `DROP DATABASE IF EXISTS ${DB_NAME}`;

const createTableUsers = `
CREATE TABLE IF NOT EXISTS Users (
    Id BIGINT PRIMARY KEY AUTO_INCREMENT,
    CreatedDate TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    UpdatedDate TIMESTAMP(6) NULL DEFAULT NULL, 
    Email VARCHAR(255) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    CompanyName VARCHAR(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    PhoneNumber VARCHAR(20) NOT NULL,
    Type VARCHAR(10) NOT NULL 
);
`; // Type = EMPLOYER - EMPLOYEE

const createTableCategories = `
CREATE TABLE IF NOT EXISTS Categories (
    Id BIGINT PRIMARY KEY AUTO_INCREMENT,
    CreatedDate TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    UpdatedDate TIMESTAMP(6) NULL DEFAULT NULL, 
    Name VARCHAR(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
)
`;

const createTableJobs = `
CREATE TABLE IF NOT EXISTS Jobs (
    Id BIGINT PRIMARY KEY AUTO_INCREMENT,
    CreatedDate TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    UpdatedDate TIMESTAMP(6) NULL DEFAULT NULL, 
    Title VARCHAR(255) NOT NULL UNIQUE,
    Description VARCHAR(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    CompanyName VARCHAR(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    Location VARCHAR(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    Salary VARCHAR(50) NOT NULL,
    Number INT NOT NULL,
    Position VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    JobType VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    Status VARCHAR(50) NOT NULL,
    UserId BIGINT NOT NULL,
    FOREIGN KEY (UserId) REFERENCES Users(Id),
    CategoryId BIGINT NOT NULL,
    FOREIGN KEY (CategoryId) REFERENCES Categories(Id),
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

const initDataUser = `
    INSERT INTO Users VALUE(null, NOW(), null , 'betosapo@gmail.com', '$2a$10$MmhCmZwqahGpCdaScWOvGeXY4AX/uaNHleI47x1B/e2qtCoBokehC', 'BETOSAPO', '09053110467', 'EMPLOYER');
`;

const initDataCategoryData = `
    INSERT INTO betosapo.Categories (CreatedDate, Name)
VALUES 
    (NOW(), '配達'),
    (NOW(), 'レストランサービス'),
    (NOW(), 'ワークフロー管理'),
    (NOW(), 'オフィス'),
    (NOW(), '技術'),
    (NOW(), 'ホテル'),
    (NOW(), '工場'),
    (NOW(), '商品の分類'),
    (NOW(), '掃除');
`;

module.exports = {
  createDB,
  dropDB,
  createTableUsers,
  createTableCategories,
  createTableJobs,
  createTableApplied,
  initDataUser,
  initDataCategoryData,
};
