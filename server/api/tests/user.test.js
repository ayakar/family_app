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
test('User should login successfully', async () => {
    const response = await request(app)
        .post('/users/login')
        .send({
            email: UserOne.email,
            password: UserOne.password,
        })
        .expect(200);
    const user = await User.findOne({ email: UserOne.email });

    expect(response.body.token).toEqual(user.tokens[1].token);
});
// user should not login with wrong password
test('User should not login with wrong password', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: UserOne.email,
            password: 'ThisIsWrongPasswords',
        })
        .expect(400);
});

// user should not login with wrong email
test('User should not login with wrong email', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: UserOne.email,
            password: 'ThisIsWrongPasswords',
        })
        .expect(400);
});

// should get user's profile
test('should get users profile', async () => {
    await request(app).get('/users').set('Authorization', `Bearer ${UserOne.tokens[0].token}`).send().expect(200);
});
// should not get user's profile without login
test('should not get users profile', async () => {
    await request(app).get('/users').send().expect(401);
});
// should delete
test('Should delete Authorized User', async () => {
    const response = await request(app).delete('/users').set('Authorization', `Bearer ${UserOne.tokens[0].token}`).send().expect(200);

    expect(response.body.name).toBe(UserOne.name);
    expect(response.body.email).toBe(UserOne.email);
});

// should not delete unauthenticated user
test('Should not  delete unauthorized User', async () => {
    await request(app).delete('/users').send().expect(401);
});

// should update valid user field
test('Should update valid user field', async () => {
    const response = await request(app)
        .patch('/users')
        .set('Authorization', `Bearer ${UserOne.tokens[0].token}`)
        .send({ name: 'Updated Name', password: 'myUpdatedPass123!' })
        .expect(200);

    expect(response.body.name).toEqual('Updated Name');
    expect(response.body.email).toEqual(UserOne.email);

    const user = await User.findById(response.body._id);
    expect(response.body.name).toEqual(user.name);
    expect(response.body.password).not.toEqual('myUpdatedPass123!');
});

// should not update unauthorized user field
test('Should not update unauthorized user ', async () => {
    await request(app).patch('/users').send({ name: 'Updated Name' }).expect(401);
});

// should not update invalid user field
test('Should not update invalid user field', async () => {
    await request(app).patch('/users').set('Authorization', `Bearer ${UserOne.tokens[0].token}`).send({ _id: 12345 }).expect(400);
});
