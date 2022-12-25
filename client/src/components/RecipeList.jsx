import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { getRecipeImageApiCall } from '../api/recipeApi';
import { CupHot, CupStraw, Pencil, PersonFill } from 'react-bootstrap-icons';

const StyledImageWrapper = styled.div`
    /* width: 100%; */
    /* height: ${({ theme }) => theme.avatarSize.l};
    border-radius: ${({ theme }) => theme.borderRadius.m}; */
`;
const StyledIconWrapper = styled.div`
    /* width: ${({ theme }) => theme.avatarSize.l};
    height: ${({ theme }) => theme.avatarSize.l}; */
    height: ${({ theme }) => theme.avatarSize.l};
    border-radius: ${({ theme }) => theme.borderRadius.m};
    border: ${({ theme }) => `1px solid ${theme.colors.gray}`};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const RecipeList = ({ recipe }) => {
    const theme = useTheme();
    const [recipeImage, setRecipeImage] = useState('');

    useEffect(() => {
        getRecipeImage(recipe._id);
    }, []);
    const getRecipeImage = async (recipeId) => {
        const response = await getRecipeImageApiCall(recipeId);
        const blob = await response.blob();
        if (blob.size > 0 && blob.type === 'image/jpeg') {
            const objectUrl = URL.createObjectURL(blob);
            setRecipeImage(objectUrl);
        } else {
            setRecipeImage(null);
        }
    };

    return (
        <Link to={`/recipes/${recipe._id}`}>
            <StyledImageWrapper>
                {recipeImage ? (
                    <img
                        src={recipeImage}
                        alt=""
                        // style={{ maxHeight: '100%' }}
                    />
                ) : (
                    <StyledIconWrapper>
                        <CupHot
                            size="50"
                            color={theme.colors.gray}
                        />
                    </StyledIconWrapper>
                )}
            </StyledImageWrapper>
            <div>{recipe.name}</div>
            <div>{recipe.owner}</div>
            {/* <pre>{JSON.stringify(recipe, null, 2)}</pre> */}
        </Link>
    );
};

export default RecipeList;
