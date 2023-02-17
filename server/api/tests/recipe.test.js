const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const FamilyGroup = require('../src/models/familyGroup');
const Recipe = require('../src/models/recipe');
const { setupDatabase, UserOne, familyGroupOne, UserTwo, UserThree } = require('./fixtures/db');

// Wiping DB and setup variable
beforeEach(setupDatabase);
// Recipe should be created successfully and the user should be assigned as the owner and member
test('recipe should be created successfully and the user should be assigned as the owner', async () => {
    const response = await request(app)
        .post('/recipes')
        .set('Authorization', `Bearer ${UserOne.tokens[0].token}`)
        .send({
            name: 'Tomato Salad',
            portions: 'for 2 people',
            ingredients: [
                {
                    name: 'Grape Tomato',
                    amount: '20',
                },
                {
                    name: 'Onion',
                    amount: '1',
                },
            ],
            steps: [
                {
                    description: 'Cut Tomato',
                },
                {
                    description: 'Cut Onion',
                },
            ],
            familyGroupIds: familyGroupOne._id,
        })
        .expect(201);

    expect(response.body.name).toEqual('Tomato Salad');
    expect(response.body.owner).toEqual(UserOne._id.toString());
    expect(response.body.familyGroupIds).toEqual([familyGroupOne._id.toString()]);
    expect(response.body.ingredients[0]).toMatchObject({
        name: 'grape tomato',
        amount: '20',
    });

    const recipe = await Recipe.findById(response.body._id);
    expect(recipe.name).toEqual('Tomato Salad');
    expect(recipe.owner.toString()).toEqual(UserOne._id.toString());
    expect(recipe.familyGroupIds[0].toString()).toEqual(familyGroupOne._id.toString());
});

// Recipe should NOT be created without name property
// Recipe should NOT be created without VALID familyGroupIds property
// Recipe should NOT be created without login

// should fetch recipe if the user is in the group
// should NOT fetch recipe if the user is NOT in the group
// should NOT fetch recipe if the user is NOT login
// should NOT fetch recipe if it's wrong /:id

// should fetch recipe if the user is in the group
// should NOT fetch recipe if the user is NOT in the group
// should NOT fetch recipe if the user is NOT login
// should NOT fetch recipe if it's wrong familyGroup Id
