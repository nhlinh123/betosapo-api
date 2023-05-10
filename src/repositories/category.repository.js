const getAllCategories = `
    SELECT * FROM Categories ORDER BY CreatedDate DESC;
`;

module.exports = {
  getAllCategories,
};
