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
    SELECT * FROM Jobs WHERE Status = 'OPEN' 
    ORDER BY CreatedDate DESC 
    LIMIT 8
`;

const getJobsByType = `
    SELECT * FROM Jobs WHERE JobType = ? AND Status = 'OPEN' ORDER BY CreatedDate DESC LIMIT ? OFFSET ? ;
`;

const applyJob = `
    INSERT INTO Applied (Id, CreatedDate,FullName, PhoneNumber, Email, Path, JobId)
    VALUES (null, NOW(),?, ?, ?, ?, ?);
`;

const getAllJobs = `
    SELECT Id, Title FROM Jobs WHERE Status = 'OPEN' ORDER BY CreatedDate DESC;
`;

module.exports = {
  createNewJobRepo,
  getNew8Jobs,
  getJobsByType,
  applyJob,
  getAllJobs,
};
