import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getRecipeApiCall } from '../api/recipeApi';

const Recipe = () => {
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState({});
    useEffect(() => {
        getRecipe(recipeId);
    });

    const getRecipe = async (recipeId) => {
        try {
            const response = await getRecipeApiCall(recipeId);
            if (!response.ok) {
                throw new Error();
            }
            const data = await response.json();
            setRecipe(data);
        } catch (error) {
            console.log('Something went wrong');
        }
    };

    return <pre>{JSON.stringify(recipe, null, 2)}</pre>;
};

export default Recipe;
