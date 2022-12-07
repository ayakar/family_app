const mongoose = require('mongoose');

const familyGroupSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },

        members: [
            {
                member: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'User',
                },
            },
        ],
    },
    { timestamps: true }
);

familyGroupSchema.virtual('recipes', {
    ref: 'Recipe',
    localField: '_id',
    foreignField: 'familyGroupIds',
});

const FamilyGroup = mongoose.model('FamilyGroup', familyGroupSchema);
module.exports = FamilyGroup;
