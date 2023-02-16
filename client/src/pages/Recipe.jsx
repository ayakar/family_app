import React, { useEffect, useState } from 'react';
import { redirect, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useAuth } from '../contexts/AuthContext';
import { useConfirmation } from '../contexts/ConfirmationContext';
import { getRecipeApiCall, getRecipeImageApiCall, deleteRecipeApiCall } from '../api/recipeApi';
import { generateObjectUrl } from '../util/generateObjectUrl';
import { getUserAvatarApiCall } from '../api/userApi';
import IconButton from '../UI/IconButton';
import Container from '../UI/Container';

import RecipeSingleFirstRow from '../components/RecipeSingleFirstRow';
import RecipeSingleSecondRow from '../components/RecipeSingleSecondRow';
import RecipeSingleThirdRow from '../components/RecipeSingleThirdRow';
import ErrorBoundary from '../ErrorBoundary';

const StyledContainer = styled(Container)`
    /* padding: ${({ theme }) => theme.spacing.l}; */
`;
const StyledIconButton = styled(IconButton)`
    margin-bottom: ${({ theme }) => theme.spacing.s};
    font: inherit;
`;

const Recipe = () => {
    const { recipeId } = useParams();

    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const { confirmation } = useConfirmation();

    const [recipe, setRecipe] = useState({});
    const [recipeImage, setRecipeImage] = useState('');
    const [ownerAvatar, setOwnerAvatar] = useState('');

    useEffect(() => {
        getRecipe(recipeId);
        getRecipeImage(recipeId);
    }, []);

    // Need to fetch once getRecipe is done
    useEffect(() => {
        if (recipe.owner) {
            getOwnerAvatar(recipe.owner);
        }
    }, [recipe]);

    const getRecipe = async (recipeId) => {
        try {
            const response = await getRecipeApiCall(recipeId);
            if (!response.ok) {
                throw new Error();
            }
            const data = await response.json();
            setRecipe(data);
        } catch (error) {
            navigate('/recipes');
        }
    };

    const getRecipeImage = async (recipeId) => {
        const response = await getRecipeImageApiCall(recipeId);
        const objectUrl = await generateObjectUrl(response);
        setRecipeImage(objectUrl);
    };

    const getOwnerAvatar = async (recipeOwnerId) => {
        const response = await getUserAvatarApiCall(recipeOwnerId);
        const objectUrl = await generateObjectUrl(response);
        setOwnerAvatar(objectUrl);
    };

    const deleteSubmitHandler = async () => {
        try {
            const isConfirmed = await confirmation({
                text: 'Delete this recipe?',
                buttonLabel: 'Yes. I want to delete this recipe',
            });
            console.log(isConfirmed);
            if (isConfirmed) {
                const response = await deleteRecipeApiCall(recipeId);
                if (!response.ok) {
                    throw new Error();
                }
                // Redirect user to recipe lists by getting recipe data with deleted id
                // TODO show confirmation message before calling this function
                getRecipe(recipeId);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <StyledContainer>
            <ErrorBoundary>
                <StyledIconButton onClick={() => navigate(-1)}>
                    <ArrowLeft />
                    Back to Recipe Lists
                </StyledIconButton>
            </ErrorBoundary>
            <ErrorBoundary>
                <RecipeSingleFirstRow
                    recipeId={recipeId}
                    name={recipe.name}
                    recipeOwnerId={recipe.owner}
                    currentUserId={currentUser._id}
                    deleteSubmitHandler={deleteSubmitHandler}
                />
            </ErrorBoundary>
            <ErrorBoundary>
                <RecipeSingleSecondRow
                    recipeImage={recipeImage}
                    recipeDescription={recipe.recipeDescription}
                    ownerAvatar={ownerAvatar}
                    externalUrl={recipe.externalUrl}
                    portions={recipe.portions}
                    ingredients={recipe.ingredients}
                />
            </ErrorBoundary>
            <ErrorBoundary>
                <RecipeSingleThirdRow
                    steps={recipe.steps}
                    note={recipe.note}
                    createdAt={recipe.createdAt}
                    updatedAt={recipe.updatedAt}
                    familyGroupIds={recipe.familyGroupIds}
                    primaryFamilyGroup={recipe.primaryFamilyGroup}
                />
            </ErrorBoundary>
            {/* <pre>{JSON.stringify(recipe, null, 2)}</pre> */}
        </StyledContainer>
    );
};

export default Recipe;
