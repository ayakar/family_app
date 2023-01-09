import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useAuth } from '../contexts/AuthContext';
import { getRecipeApiCall, getRecipeImageApiCall } from '../api/recipeApi';
import { generateObjectUrl } from '../util/generateObjectUrl';
import { getUserAvatarApiCall } from '../api/userApi';
import IconButton from '../UI/IconButton';
import Container from '../UI/Container';

import RecipeSingleFirstRow from '../components/RecipeSingleFirstRow';
import RecipeSingleSecondRow from '../components/RecipeSingleSecondRow';
import RecipeSingleThirdRow from '../components/RecipeSingleThirdRow';
import ErrorBoundary from '../ErrorBoundary';

const Recipe = () => {
    const { recipeId } = useParams();

    const navigate = useNavigate();
    const { currentUser } = useAuth();

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
            console.log('Something went wrong');
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

    return (
        <Container>
            <ErrorBoundary>
                <IconButton onClick={() => navigate(-1)}>
                    <ArrowLeft />
                    Back to Recipe List
                </IconButton>
            </ErrorBoundary>
            <ErrorBoundary>
                <RecipeSingleFirstRow
                    name={recipe.name}
                    recipeOwnerId={recipe.owner}
                    currentUserId={currentUser._id}
                />
            </ErrorBoundary>
            <ErrorBoundary>
                <RecipeSingleSecondRow
                    recipeImage={recipeImage}
                    recipeDescription={recipe.recipeDescription}
                    ownerAvatar={ownerAvatar}
                    familyGroupIds={recipe.familyGroupIds}
                    externalUrl={recipe.externalUrl}
                    portions={recipe.portions}
                    ingredients={recipe.ingredients}
                />
            </ErrorBoundary>
            <ErrorBoundary>
                <RecipeSingleThirdRow
                    steps={recipe.steps}
                    note={recipe.note}
                    createdAt={recipe.createAt}
                    updatedAt={recipe.updatedAt}
                />
            </ErrorBoundary>
            {/* <pre>{JSON.stringify(recipe, null, 2)}</pre> */}
        </Container>
    );
};

export default Recipe;
