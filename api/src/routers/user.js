const express = require('express');
const router = new express.Router();
const User = require('../models/user');

router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken(); // .generateAuthToken() is custom function using jwt and it's defined in model. Token will be stored to the user
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send({ error }); // TODO: custom error message
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = router;
