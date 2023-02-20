const express = require('express');
const fetch = require('node-fetch');
const router = new express.Router();
const sharp = require('sharp');
const { upload } = require('../config/multerConfig');
const User = require('../models/user');
const auth = require('../middleware/auth');

router.post('/users', async (req, res) => {
    try {
        // ReCaptcha
        const response = await fetch(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${req.body.reCaptchaToken}`,
            {
                method: 'POST',
            }
        );
        const isHuman = await response.json();

        if (!isHuman.success) {
            return res.status(503).send({ error: 'Bot detected' });
        }

        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            // CAUTION!! THIS ERROR MESSAGE IS PARSED IN FRONTEND!!!
            return res.status(400).send({ error: 'Email duplicated' });
        }
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken(); // .generateAuthToken() is custom function using jwt and it's defined in model. Token will be stored to the user
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send({ error });
    }
});

router.post('/users/login', async (req, res) => {
    try {
        // ReCaptcha
        const response = await fetch(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${req.body.reCaptchaToken}`,
            {
                method: 'POST',
            }
        );
        const isHuman = await response.json();

        if (!isHuman.success) {
            return res.status(503).send({ error: 'Bot detected' });
        }

        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.header('Access-Control-Allow-Origin', '*');
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
        res.status(500).send();
    }
});

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send(req.user);
    } catch (error) {
        res.status(500).send();
    }
});

router.get('/users', auth, async (req, res) => {
    try {
        res.send(req.user);
    } catch (error) {}
});

router.patch('/users', auth, async (req, res) => {
    const availableProperties = ['name', 'email', 'password', 'role'];
    const updatingProperties = Object.keys(req.body);
    const isValidated = updatingProperties.every((item) => availableProperties.includes(item));

    if (!isValidated) {
        return res.status(400).send({ error: 'Invalid update' });
    }

    try {
        updatingProperties.forEach((key) => {
            req.user[key] = req.body[key];
        });
        await req.user.save();
        res.send(req.user);
    } catch (error) {
        res.status(500).send();
    }
});

router.delete('/users', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user);
    } catch (error) {
        res.status(500).send();
    }
});

router.post(
    '/users/avatar',
    auth,
    upload.single('avatar'),
    async (req, res) => {
        if (!req.file) {
            return res.status(400).send({ error: 'Please upload an image' });
        }
        const buffer = await sharp(req.file.buffer).resize({ width: 500, height: 500 }).jpeg().toBuffer();
        req.user.avatar = buffer;
        await req.user.save();
        res.send();
    },
    (error, req, res, next) => {
        res.status(400).send({ error: error.message });
    }
);
router.get('/users/:id/avatar', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        if (!user.avatar) {
            return res.send();
        }
        res.set('Content-Type', 'image/jpeg');
        res.send(user.avatar);
    } catch (error) {
        res.status(400).send(error);
    }
});
router.delete('/users/avatar', auth, async (req, res) => {
    try {
        req.user.avatar = undefined;
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/users/familyGroups', auth, async (req, res) => {
    try {
        res.send(req.familyGroups);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
