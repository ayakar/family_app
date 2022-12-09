const User = require('../../src/models/user');

const UserOne = {
    name: 'User one',
    email: 'userone@test.ca',
    password: 'Testtest123!!',
};

// Function for Wiping DB for each testing
const setupDatabase = async () => {
    await User.deleteMany();
    await new User(UserOne).save();
};

module.exports = { setupDatabase, UserOne };
