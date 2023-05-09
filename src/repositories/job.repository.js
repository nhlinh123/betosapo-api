const createNewJobRepo = `
INSERT INTO Jobs VALUE(
    null,
     NOW(), -- created date
     null, -- updated date
      ?, -- title
       ?, -- description
        ?, -- company name
         ?, -- location
          ?, -- salary
          ?, -- number
          ?, -- position
          ?,  -- job type part time full time
          ?, -- status INPROCESSING COMPLETED 
          ?, -- userId
          ?, -- categoryId
          ? -- Picture path 
    );
`;

// const findJobs = `
// SELECT * FROM Jobs WHERE Email = ?
// `;

module.exports = {
  createNewJobRepo,
  // findJobs,
};
