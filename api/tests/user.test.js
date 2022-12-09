const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');

const { setupDatabase } = require('./fixtures/db');

// Wiping DB and setup variable
beforeEach(setupDatabase);

test('User create successfully. The response should contain token', async () => {
    const response = await request(app)
        .post('/users')
        .send({
            name: 'Ayaka',
            email: 'test@test.ca',
            password: 'Testtest123!!',
        })
        .expect(201);
    const user = await User.findById(response.body.user._id);
});

// user should not be created without name
// user should not be created without email
// user should not be created with simple email

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
