const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user');

const userOneId = new mongoose.Types.ObjectId();

const UserOne = {
    _id: userOneId,
    name: 'User one',
    email: 'userone@test.ca',
    password: 'Testtest123!!',
    tokens: [{ token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET) }],
};

// Function for Wiping DB for each testing
const setupDatabase = async () => {
    await User.deleteMany();
    await new User(UserOne).save();
};

module.exports = { setupDatabase, UserOne };
