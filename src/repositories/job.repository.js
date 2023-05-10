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
module.exports = {
  createNewJobRepo,
  // findJobs,
};
