import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { PlusCircle } from 'react-bootstrap-icons';
import { getUserRecipesApiCall } from '../api/recipeApi';
import Button from '../UI/Button';
import RecipeList from './RecipeList';

const StyledRecipeLists = styled.div``;
// const StyledTitle = styled.h3`
//     font-size: ${({ theme }) => theme.fontSize.l};
// `;

const RecipeLists = ({ familyGroup }) => {
    const theme = useTheme();
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        getUserRecipes();
    }, []);

    const getUserRecipes = async () => {
        try {
            const response = await getUserRecipesApiCall();
            if (!response.ok) {
                throw new Error();
            }
            const data = await response.json();
            setRecipes(data);
        } catch (error) {
            console.log('Something went wrong');
        }
    };

    return (
        <>
            <StyledRecipeLists>
                <div>
                    {recipes.length <= 0 ? (
                        <div>No recipe found</div>
                    ) : (
                        recipes.map((recipe) => (
                            <RecipeList
                                key={recipe._id}
                                recipe={recipe}
                            />
                        ))
                    )}
                </div>
            </StyledRecipeLists>
        </>
    );
};

export default RecipeLists;
