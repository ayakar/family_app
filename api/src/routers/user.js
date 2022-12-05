const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');

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

router.post('/users/logout', auth, async (req, res) => {
    try {
        const newTokens = req.user.tokens.filter((token) => token.token !== req.token);
        req.user.tokens = newTokens;
        await req.user.save();
        res.send(req.user);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send(req.user);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
