import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { PlusCircle } from 'react-bootstrap-icons';
import { getFamilyGroupRecipesApiCall } from '../api/recipeApi';
import Button from '../UI/Button';

const StyledRecipeLists = styled.div``;
const StyledTitle = styled.h3`
    font-size: ${({ theme }) => theme.fontSize.l};
`;

const RecipeLists = ({ familyGroup }) => {
    const theme = useTheme();
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        getFamilyGroupRecipes(familyGroup._id);
    }, []);

    const getFamilyGroupRecipes = async (familyGroupId) => {
        try {
            const response = await getFamilyGroupRecipesApiCall(familyGroupId);
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
                <StyledTitle>{familyGroup.name}</StyledTitle>

                <div>
                    {recipes.length <= 0 ? (
                        <div>No recipe found for this family group</div>
                    ) : (
                        recipes.map((recipe) => <div key={recipe._id}>{recipe.name}</div>)
                    )}
                </div>
            </StyledRecipeLists>
        </>
    );
};

export default RecipeLists;
