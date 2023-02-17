const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const FamilyGroup = require('../src/models/familyGroup');

const { setupDatabase, UserOne, familyGroupOne, UserTwo, UserThree } = require('./fixtures/db');
const Recipe = require('../src/models/recipe');

// Wiping DB and setup variable
beforeEach(setupDatabase);

// Family should be created successfully and the user should be assigned as the owner and members
test('family should be created successfully and the user should be assigned as the owner and members', async () => {
    const response = await request(app)
        .post('/familyGroups')
        .set('Authorization', `Bearer ${UserOne.tokens[0].token}`)
        .send({
            name: 'new family group',
        })
        .expect(201);

    expect(response.body.name).toEqual('new family group');
    expect(response.body.owner).toEqual(UserOne._id.toString());
    expect(response.body.members[0].member).toEqual(UserOne._id.toString());

    const familyGroup = await FamilyGroup.findById(response.body._id);
    expect(familyGroup.name).toEqual('new family group');
    expect(familyGroup.owner.toString()).toEqual(UserOne._id.toString());
    expect(familyGroup.members[0].member.toString()).toEqual(UserOne._id.toString());
});

// family group should not be created without authorization
test('Family group should not be created without authorization', async () => {
    await request(app)
        .post('/familyGroups')
        .send({
            name: 'new family group',
        })
        .expect(401);
});

// family group should not be created without name property
test('Family group should not be created without name property', async () => {
    await request(app).post('/familyGroups').set('Authorization', `Bearer ${UserOne.tokens[0].token}`).send({}).expect(400);
});
// should fetch family group if the user is in the group
test('Should fetch family group if the user is in the group', async () => {
    await request(app).get(`/familyGroups/${familyGroupOne._id}`).set('Authorization', `Bearer ${UserOne.tokens[0].token}`).send().expect(200);
});

// should not fetch family group if the user is not in the group
test('should not fetch family group if the user is not in the group', async () => {
    await request(app).get(`/familyGroups/${familyGroupOne._id}`).set('Authorization', `Bearer ${UserThree.tokens[0].token}`).send().expect(404);
});

// should delete family group if it's owner
test('Should delete family group if its owner', async () => {
    await request(app).delete(`/familyGroups/${familyGroupOne._id}`).set('Authorization', `Bearer ${UserOne.tokens[0].token}`).send().expect(200);
});

// should NOT delete family group if user is not the owner, it's member
test('Should NOT delete family group if user is not the owner, its member', async () => {
    await request(app).delete(`/familyGroups/${familyGroupOne._id}`).set('Authorization', `Bearer ${UserTwo.tokens[0].token}`).send().expect(401);
});

// should NOT delete family group if user is not log in
test('Should NOT delete family group if user is not log in', async () => {
    await request(app).delete(`/familyGroups/${familyGroupOne._id}`).send().expect(401);
});

// should update family group if user is member and valid field
// should NOT update family group if user is not member
// should NOT update family group if user is not login
// should NOT update family group if it's invalid filed

// should add family member if user is member
// should NOT add family member if user is not member
// should NOT add family member if user is not login
