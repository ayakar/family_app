const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user');
const Recipe = require('../../src/models/recipe');
const FamilyGroup = require('../../src/models/familyGroup');

// UserOne : OWNER OF FamilyGroupOne
const userOneId = new mongoose.Types.ObjectId();
const UserOne = {
    _id: userOneId,
    name: 'User one',
    email: 'userone@test.ca',
    password: 'Testtest123!!',
    tokens: [{ token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET) }],
};

// UserTwo : MEMBER of FamilyGroupOne
const userTwoId = new mongoose.Types.ObjectId();
const UserTwo = {
    _id: userTwoId,
    name: 'User one',
    email: 'usertwo@test.ca',
    password: 'Testtest123!!',
    tokens: [{ token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET) }],
};

// UserThree : no FamilyGroup assigned
const userThreeId = new mongoose.Types.ObjectId();
const UserThree = {
    _id: userThreeId,
    name: 'User two',
    email: 'userthree@test.ca',
    password: 'Testtest123!!',
    tokens: [{ token: jwt.sign({ _id: userThreeId }, process.env.JWT_SECRET) }],
};

const familyGroupOneId = new mongoose.Types.ObjectId();
const familyGroupOne = {
    _id: familyGroupOneId,
    name: 'Family Group One',
    owner: userOneId,
    members: [{ member: userOneId, _id: new mongoose.Types.ObjectId() }],
};

// Function for Wiping DB for each testing
const setupDatabase = async () => {
    await User.deleteMany();
    await FamilyGroup.deleteMany();
    // await Recipe.deleteMany();
    await new User(UserOne).save();
    await new User(UserTwo).save();
    await new User(UserThree).save();

    await new FamilyGroup(familyGroupOne).save();
};

module.exports = { setupDatabase, UserOne, UserTwo, UserThree, familyGroupOne };
