import React from 'react';
import { Link } from 'react-router-dom';

const RecipeList = ({ recipe }) => {
    return (
        <Link to={`/recipes/${recipe._id}`}>
            <div>{recipe.name}</div>
            {/* <pre>{JSON.stringify(recipe, null, 2)}</pre> */}
        </Link>
    );
};

export default RecipeList;
