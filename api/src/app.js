const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');

// Loading .env file
if (process.env.NODE_ENV === 'test') {
    dotenv.config({ path: path.join(__dirname, '/./../../.env.test.local') });
} else if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: path.join(__dirname, '/./../../.env.development.local') });
}
// Connecting DB
require('./db/mongoose');
// Loading Routers
const userRouter = require('./routers/user');
const recipeRouter = require('./routers/recipe');
const familyGroupRouter = require('./routers/familyGroup');

// To send/receive json
app.use(express.json());

// Assigning routers
app.use(userRouter);
app.use(recipeRouter);
app.use(familyGroupRouter);
