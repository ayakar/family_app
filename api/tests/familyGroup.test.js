const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const FamilyGroup = require('../src/models/familyGroup');

const { setupDatabase, UserOne } = require('./fixtures/db');

// Wiping DB and setup variable
//beforeEach(setupDatabase);

// Family should be created successfully and the user should be assigned as the owner and members
test('family should be created successfully and the user should be assigned as the owner and members', () => {});

// family group should not be created without authorization
// family group should not be created without name property

// should fetch family group if the user is in the group
// should not fetch family group if the user is not in the group

// should delete family group if it's owner
// should NOT delete family group if user is not the owner, it's member
// should NOT delete family group if user is not log in

// should update family group if user is member and valid field
// should NOT update family group if user is not member
// should NOT update family group if user is not login
// should NOT update family group if it's invalid filed

// should add family member if user is member
// should NOT add family member if user is not member
// should NOT add family member if user is not login
