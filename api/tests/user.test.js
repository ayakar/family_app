const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');

const { setupDatabase, UserOne } = require('./fixtures/db');

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
    // DB check
    const user = await User.findById(response.body.user._id);
    expect(user.name).toEqual('Ayaka');
    expect(user.email).toEqual('test@test.ca');

    // Response check
    expect(response.body).toMatchObject({
        user: { name: 'Ayaka', email: 'test@test.ca' },
        token: user.tokens[0].token,
    });
    // To make sure password is not plain text
    expect(user.password).not.toEqual('Testtest123!!');
});

// user should not be created without name
test('user should not be created without name', async () => {
    await request(app)
        .post('/users')
        .send({
            email: 'test@test.ca',
            password: 'testtest',
        })
        .expect(400);
});
// user should not be created without email
test('user should not be created without email', async () => {
    await request(app)
        .post('/users')
        .send({
            name: 'Ayaka',
            password: 'Testtest123!!',
        })
        .expect(400);
});
// user should not be created with simple email
test('user should not be created without email', async () => {
    await request(app)
        .post('/users')
        .send({
            name: 'Ayaka',
            password: 'Testtest123!!',
        })
        .expect(400);
});

// user should not be created with duplicated email
test('user should not be created with duplicated email', async () => {
    await request(app)
        .post('/users')
        .send({
            name: 'Ayaka',
            email: UserOne.email,
            password: 'Testtest123!!',
        })
        .expect(400);
});

// user should login successfully
// user should not login with wrong password
// user should not login with wrong email

// should get user's profile
// should not get user's profile without login
// should delete
// should not delete unauthenticated user
// should update valid user field
// should not update invalid user field
