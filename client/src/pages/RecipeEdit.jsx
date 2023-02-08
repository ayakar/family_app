import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useAuth } from '../contexts/AuthContext';
import {
    getRecipeApiCall,
    getRecipeImageApiCall,
    updateRecipeApiCall,
    addFamilyGroupToRecipeApiCall,
    removeFamilyGroupToRecipeApiCall,
} from '../api/recipeApi';
import { generateObjectUrl } from '../util/generateObjectUrl';
import { getUserAvatarApiCall } from '../api/userApi';
import RecipeFrom from '../components/RecipeFrom';
import IconButton from '../UI/IconButton';
import Container from '../UI/Container';

import ErrorBoundary from '../ErrorBoundary';

const StyledContainer = styled(Container)`
    padding: ${({ theme }) => theme.spacing.l};
`;
const StyledIconButton = styled(IconButton)`
    margin-bottom: ${({ theme }) => theme.spacing.s};
    font: inherit;
`;

const RecipeEdit = () => {
    const { recipeId } = useParams();

    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const [recipe, setRecipe] = useState({});
    const [recipeImage, setRecipeImage] = useState('');
    const [ownerAvatar, setOwnerAvatar] = useState('');
    const [contentUpdateStatus, setContentUpdateStatus] = useState(null);
    // const [imageErrorMessage, setImageErrorMessage] = useState('');
    // const [familyGroupsErrorMessage, setFamilyGroupsErrorMessage] = useState('');

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

    // Submit update (name, desc, url, ing, steps, note)
    const contentUpdateHandler = async (reqBody) => {
        setContentUpdateStatus(null);
        try {
            const response = await updateRecipeApiCall(recipeId, reqBody);
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            setContentUpdateStatus('Update Success');
            setTimeout(() => {
                setContentUpdateStatus(null);
            }, 5000);
        } catch (error) {
            // setSubmissionStatus('fail');
            setContentUpdateStatus('Update fail');
            console.log(error);
        }
    };
    // Submit images update (image)
    const imageUpdateHandler = async (reqBody) => {
        console.log(reqBody);
    };
    // Submit Add Family Group (familyGroup)
    const familyGroupsUpdateHandler = async (reqBody) => {
        await addFamilyGroupToRecipeApiCall(recipeId, { familyGroup: reqBody });
        getRecipe(recipeId);
    };
    const familyGroupsRemoveHandler = async (reqBody) => {
        await removeFamilyGroupToRecipeApiCall(recipeId, { familyGroup: reqBody });
        getRecipe(recipeId);
    };

    return (
        <>
            <ErrorBoundary>
                <StyledIconButton onClick={() => navigate(-1)}>
                    <ArrowLeft />
                    Back to Recipe
                </StyledIconButton>
            </ErrorBoundary>
            <ErrorBoundary>
                {recipe && (
                    <RecipeFrom
                        isCreate={false}
                        recipeImage={recipeImage}
                        recipe={recipe}
                        setRecipe={setRecipe}
                        contentSubmitHandler={contentUpdateHandler}
                        contentContentUpdateStatus={contentUpdateStatus}
                        setContentContentUpdateStatus={setContentUpdateStatus}
                        imageSubmitHandler={imageUpdateHandler}
                        familyGroupsUpdateHandler={familyGroupsUpdateHandler}
                        familyGroupsRemoveHandler={familyGroupsRemoveHandler}
                    />
                )}
            </ErrorBoundary>
        </>
    );
};

export default RecipeEdit;
