const User = require('../../src/models/user');

// Function for Wiping DB for each testing
const setupDatabase = async () => {
    await User.deleteMany();
};

module.exports = { setupDatabase };
