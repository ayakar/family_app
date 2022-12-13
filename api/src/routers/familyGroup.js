const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const FamilyGroup = require('../models/familyGroup');
const User = require('../models/user');

router.post('/familyGroups', auth, async (req, res) => {
    try {
        const familyGroup = new FamilyGroup({ ...req.body, owner: req.user._id, members: [{ member: req.user._id }] });
        const result = await familyGroup.save();
        res.status(201).send(result);
    } catch (error) {
        res.status(400).send();
    }
});

router.get('/familyGroups/:id', auth, async (req, res) => {
    try {
        const familyGroup = await FamilyGroup.findOne({ _id: req.params.id, 'members.member': req.user._id });
        if (!familyGroup) {
            return res.status(404).send({ error: 'Family Group Not Found' });
        }
        await familyGroup.populate('members.member'); // Converting userIDs to name/email etc
        res.send(familyGroup);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/familyGroups/:id', auth, async (req, res) => {
    const allowedProperties = ['name'];
    const requestedProperties = Object.keys(req.body);

    const isValid = requestedProperties.every((property) => allowedProperties.includes(property));

    if (!isValid) {
        return res.status(400).send({ error: 'Update Not Allow' });
    }

    try {
        const familyGroup = await FamilyGroup.findOne({ _id: req.params.id, 'members.member': req.user._id });

        // VALIDATING IF THE FAMILY GROUP EXIST AND THE USER IS A MEMBER
        if (!familyGroup) {
            return res.status(404).send({ error: 'Family Group Not Found' });
        }

        // UPDATING FIELDS
        requestedProperties.forEach((property) => {
            familyGroup[property] = req.body[property];
        });

        await familyGroup.save();
        await familyGroup.populate('members.member'); // Converting userIDs to name/email etc
        res.send(familyGroup);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/familyGroups/:id/members', auth, async (req, res) => {
    try {
        const familyGroup = await FamilyGroup.findOne({ _id: req.params.id, 'members.member': req.user._id });
        const newMember = await User.findOne({ email: req.body['member'] });

        // VALIDATING IF FAMILY GROUP EXIST AND USER IS AUTHORIZED
        if (!familyGroup) {
            return res.status(404).send({ error: 'Family Group Not Found' });
        }
        // VALIDATING IF THE NEW MEMBER EXIST
        if (!newMember) {
            return res.status(404).send({ error: 'Member not found' });
        }
        // VALIDATING IF THE USER ALREADY IN MEMBERS
        const isNewMemberExist = familyGroup.members.every((member) => {
            return JSON.stringify(member.member._id) !== JSON.stringify(newMember._id);
        });
        if (!isNewMemberExist) {
            return res.status(400).send({ error: 'User is already member' });
        }

        // UPDATING DB
        const newMemberObj = { member: new mongoose.mongo.ObjectId(newMember._id) };
        familyGroup['members'] = [...familyGroup['members'], newMemberObj];
        await familyGroup.save();

        // SEND DATA TO FRONTEND
        await familyGroup.populate('members.member'); // Converting userIDs to name/email etc
        res.send(familyGroup);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete('/familyGroups/:id', auth, async (req, res) => {
    try {
        const familyGroup = await FamilyGroup.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
        if (!familyGroup) {
            return res.status(401).send({ error: 'Family Group can be deleted by the owner only' });
        }

        res.send(familyGroup);
    } catch (error) {
        res.status(500).send();
    }
});

module.exports = router;
