import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { PlusCircle } from 'react-bootstrap-icons';
import { getUserRecipesApiCall } from '../api/recipeApi';
import Button from '../UI/Button';
import RecipeList from './RecipeList';

const StyledRecipeLists = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing.m};
`;

const StyledRecipeList = styled.div`
    width: ${({ theme }) => `calc(33% - (${theme.spacing.m} * 2))`};
    width: calc(33% - (8px * 2));
    box-shadow: ${({ theme }) => theme.shadow.s};
    border-radius: ${({ theme }) => theme.borderRadius.m};
    padding: ${({ theme }) => theme.spacing.l};
`;

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
        <StyledRecipeLists>
            {recipes.length <= 0 ? (
                <div>No recipe found</div>
            ) : (
                recipes.map((recipe) => (
                    <StyledRecipeList key={recipe._id}>
                        <RecipeList recipe={recipe} />
                    </StyledRecipeList>
                ))
            )}
        </StyledRecipeLists>
    );
};

export default RecipeLists;
