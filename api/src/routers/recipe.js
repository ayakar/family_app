const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();
const Recipe = require('../models/recipe');
const checkFamilyGroup = require('../helper/checkFamilyGroup');

// Routers
router.post('/recipes', auth, async (req, res) => {
    try {
        const user = req.user;
        // TODO: make sure user is joined the familyGroup
        const recipe = new Recipe({ ...req.body, owner: user._id });
        await recipe.save();
        await recipe.populate('familyGroupIds');
        await recipe.populate('owner');

        res.status(201).send(recipe);
    } catch (error) {
        res.status(500).send(error);
    }
});

// read individual recipes
router.get('/recipes/:id', auth, async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        // VALIDATE user is joined the familyGroup
        const isValidate = checkFamilyGroup(recipe.familyGroupIds, req.familyGroups);
        if (!isValidate) {
            return res.status(404).send({ error: 'Recipe not found. Please make sure joining the family group' });
        }

        if (!recipe) {
            return res.status(404).send({ error: 'Recipe not found' });
        }
        await recipe.populate('familyGroupIds');
        await recipe.populate('owner');

        res.send(recipe);
    } catch (error) {
        res.status(500).send(error);
    }
});

// read all joined family group recipes
router.get('/recipes/familyGroup/:id', auth, async (req, res) => {
    try {
        const familyGroupId = req.params.id;

        // VALIDATE the user joins requested family group
        const isValidate = req.familyGroups.some((group) => JSON.stringify(group._id) === JSON.stringify(familyGroupId));
        if (!isValidate) {
            return res.status(404).send({ error: 'Recipe not found. Please make sure joining the family group' });
        }

        const recipes = await Recipe.find({ familyGroupIds: familyGroupId });

        res.send(recipes);
    } catch (error) {
        res.status(500).send(error);
    }
});
// TODO: TBI read specific joined family group recipes

module.exports = router;
