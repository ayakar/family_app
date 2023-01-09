const mongoose = require('mongoose');
const validator = require('validator');

const recipeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        recipeDescription: {
            type: String,
            trim: true,
        },
        portions: {
            type: String,
            trim: true,
            lowercase: true,
        },
        ingredients: [
            {
                // TODO create ingredients collection for generate shopping list.
                // type: mongoose.Schema.Types.ObjectId,
                name: {
                    type: String,
                    required: true,
                    trim: true,
                    lowercase: true,
                },
                amount: {
                    type: String,
                    required: true,
                    trim: true,
                    lowercase: true,
                },
            },
        ],
        steps: [
            {
                description: {
                    type: String,
                    required: true,
                    trim: true,
                },
                image: {
                    type: Buffer,
                },
            },
        ],
        note: {
            type: String,
        },
        externalUrl: {
            type: String,
            trim: true,
            maxLength: 255,
            validate(externalUrlValue) {
                if (!validator.isURL(externalUrlValue)) {
                    throw new Error('Please enter URL');
                }
            },
        },
        image: {
            type: Buffer,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        familyGroupIds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'FamilyGroup',
            },
        ],
    },
    { timestamps: true }
);

// Remove image from json response
recipeSchema.methods.toJSON = function () {
    const recipe = this;
    const recipeObject = recipe.toObject();
    delete recipeObject.image;
    return recipeObject;
};

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
