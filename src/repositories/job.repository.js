const createNewJobRepo = `
INSERT INTO Jobs (
  Id,
  CreatedDate,
  UpdatedDate,
  Title,
  Description,
  CompanyName,
  Location,
  Salary,
  Number,
  Position,
  JobType,
  Status,
  UserId,
  CategoryId,
  PicturePath
) VALUES (
  null,
  NOW(),
  null,
  ?,
  ?,
  ?,
  ?,
  ?,
  ?,
  ?,
  ?,
  ?,
  ?,
  ?,
  ?
);
`;

const getNew8Jobs = `
    SELECT * FROM Jobs
    ORDER BY CreatedDate DESC
    LIMIT 8
`;

const getJobsByType = `
    SELECT * FROM Jobs WHERE JobType = ? ORDER BY CreatedDate DESC LIMIT ? OFFSET ? ;
`;

module.exports = {
  createNewJobRepo,
  getNew8Jobs,
  getJobsByType,
};
