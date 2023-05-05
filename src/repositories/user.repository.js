const createNewEmployerQuery = `
INSERT INTO Users VALUE(null, NOW(), ?, ?, ?, ?, ?);
`;

const findEmployerByEmailQuery = `
SELECT * FROM Users WHERE Email = ?
`;

module.exports = {
  createNewEmployerQuery,
  findEmployerByEmailQuery,
};
