const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
test('user create successfully', async () => {});

// user should not be created without name
// user should not be created without email
// user should not be created without password
// user should not be created with duplicated email

// user should login successfully
// user should not login with wrong password
// user should not login with wrong email

// should get user's profile
// should not get user's profile without login
// should delete
// should not delete unauthenticated user
// should update valid user field
// should not update invalid user field
