const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();
const sharp = require('sharp');
const mongoose = require('mongoose');
const Recipe = require('../models/recipe');
const FamilyGroup = require('../models/familyGroup');
const checkFamilyGroup = require('../helper/checkFamilyGroup');
const { upload } = require('../config/multerConfig');

// Routers
router.post('/recipes', auth, async (req, res) => {
    try {
        const user = req.user;

        // VALIDATE user is joined the recipe
        const isValidate = checkFamilyGroup(req.familyGroups, req.body.familyGroupIds);
        if (!isValidate) {
            return res.status(401).send({ error: 'Please make sure you join the family group' });
        }

        const recipe = new Recipe({ ...req.body, owner: user._id });
        await recipe.save();
        // await recipe.populate('familyGroupIds');
        // await recipe.populate('owner');

        res.status(201).send(recipe);
    } catch (error) {
        res.status(500).send(error);
    }
});

// read individual recipes
router.get('/recipes/:id', auth, async (req, res) => {
    try {
        // FIND RECIPE
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).send({ error: 'Recipe not found' });
        }

        // VALIDATE user is joined the recipe
        const isValidate = checkFamilyGroup(req.familyGroups, recipe.familyGroupIds);
        if (!isValidate) {
            return res.status(404).send({ error: 'Recipe not found. Please make sure joining the family group' });
        }

        // await recipe.populate('familyGroupIds');
        // await recipe.populate('owner');
        await recipe.populate('familyGroupIds');

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
        const isValidate = checkFamilyGroup(req.familyGroups, req.params.id);
        // const isValidate = req.familyGroups.some((group) => JSON.stringify(group._id) === JSON.stringify(familyGroupId));
        if (!isValidate) {
            return res.status(404).send({ error: 'Recipe not found. Please make sure joining the family group' });
        }

        const recipes = await Recipe.find({ familyGroupIds: familyGroupId });
        res.send(recipes);
    } catch (error) {
        res.status(500).send(error);
    }
});
// read all recipe for the user
router.get('/recipes', auth, async (req, res) => {
    try {
        const usersFamilyGroups = req.familyGroups;
        const usersFamilyGroupsIds = usersFamilyGroups.map((usersFamilyGroup) => usersFamilyGroup._id);
        const recipes = await Recipe.find({ familyGroupIds: { $in: usersFamilyGroupsIds } });
        res.send(recipes);
    } catch (error) {
        res.status(500).send(error);
    }
});

// update
router.patch('/recipes/:id', auth, async (req, res) => {
    const allowedProperties = ['name', 'recipeDescription', 'portions', 'ingredients', 'steps', 'note', 'externalUrl'];
    const requestedProperties = Object.keys(req.body);

    const isPropertyAllow = requestedProperties.every((property) => allowedProperties.includes(property));

    if (!isPropertyAllow) {
        return res.status(400).send({ error: 'The property not allow to update' });
    }

    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).send({ error: 'Recipe not found' });
        }

        // VALIDATE user is joined the recipe
        const isValidate = checkFamilyGroup(req.familyGroups, recipe.familyGroupIds);
        if (!isValidate) {
            return res.status(404).send({ error: 'Recipe not found. Please make sure joining the family group' });
        }

        // TODO: make sure ingredients and steps update work
        requestedProperties.forEach((property) => {
            recipe[property] = req.body[property];
        });
        await recipe.save();
        res.send(recipe);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/recipes/:id/familyGroup', auth, async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        const newFamilyGroup = await FamilyGroup.findOne({ _id: req.body['familyGroup'] });

        // VALIDATE user is joined the recipe
        const isValidate = checkFamilyGroup(req.familyGroups, recipe.familyGroupIds);
        if (!isValidate) {
            return res.status(404).send({ error: 'Recipe not found. Please make sure joining the family group' });
        }

        // VALIDATING IF RECIPE EXIST AND USER IS AUTHORIZED
        if (!recipe) {
            return res.status(404).send({ error: 'Recipe not Found' });
        }
        // VALIDATING IF THE NEW FAMILY GROUP EXIST
        if (!newFamilyGroup) {
            return res.status(404).send({ error: 'Family Group Not Found' });
        }
        // VALIDATING IF THE USER ALREADY IN MEMBERS
        const isNewFamilyExist = recipe.familyGroupIds.every((familyGroupId) => {
            // console.log(JSON.stringify(familyGroupId), JSON.stringify(newFamilyGroup._id));
            return JSON.stringify(familyGroupId) !== JSON.stringify(newFamilyGroup._id);
        });

        if (!isNewFamilyExist) {
            return res.status(400).send({ error: 'This family group is already added' });
        }

        // UPDATING DB
        console.log(new mongoose.mongo.ObjectId(newFamilyGroup._id));
        recipe.familyGroupIds = [...recipe.familyGroupIds, new mongoose.mongo.ObjectId(newFamilyGroup._id)];

        await recipe.save();

        // SEND DATA TO FRONTEND
        //await recipe.populate('familyGroupIds'); // Converting userIDs to name/email etc
        res.send(recipe);
    } catch (error) {
        res.status(500).send(error);
    }
});

// delete
router.delete('/recipes/:id', auth, async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).send({ error: 'Recipe not found' });
        }

        // VALIDATE user is joined the recipe
        const isValidate = checkFamilyGroup(req.familyGroups, recipe.familyGroupIds);
        if (!isValidate) {
            return res.status(404).send({ error: 'Recipe not found. Please make sure joining the family group' });
        }
        await recipe.remove();
        res.send(recipe);
    } catch (error) {
        res.status(500).send();
    }
});

// post recipe image
router.post(
    '/recipes/:id/image',
    auth,
    upload.single('recipeImage'),
    async (req, res) => {
        if (!req.file) {
            return res.status(400).send({ error: 'Please upload an image' });
        }
        const buffer = await sharp(req.file.buffer).resize({ width: 500, height: 500 }).jpeg().toBuffer();

        // TODO: make sure user is in the family group
        const recipe = await Recipe.findById(req.params.id);
        recipe.image = buffer;
        await recipe.save();
        res.send();
    },
    (error, req, res, next) => {
        res.status(400).send({ error: error.message });
    }
);
// read recipe image
router.get('/recipes/:id/image', auth, async (req, res) => {
    try {
        // TODO: make sure user is in the family group
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).send({ error: 'Recipe not found' });
        }
        if (!recipe.image) {
            return res.send();
        }
        res.set('Content-Type', 'image/jpeg');
        res.send(recipe.image);
    } catch (error) {
        res.status(400).send(error);
    }
});
// delete recipe image

// post recipe step image
// read recipe step image
// delete recipe step image

module.exports = router;
