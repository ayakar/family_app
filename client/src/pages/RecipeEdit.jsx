import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useAuth } from '../contexts/AuthContext';
import {
    getRecipeApiCall,
    getRecipeImageApiCall,
    updateRecipeApiCall,
    addFamilyGroupToRecipeApiCall,
    removeFamilyGroupToRecipeApiCall,
    uploadRecipeImageApiCall,
    deleteRecipeImageApiCall,
} from '../api/recipeApi';
import { generateObjectUrl } from '../util/generateObjectUrl';

import ErrorBoundary from '../ErrorBoundary';
import RecipeFormImage from '../components/RecipeFormImage';
import RecipeFormBasicInfo from '../components/RecipeFormBasicInfo';
import RecipeFormIngredients from '../components/RecipeFormIngredients';
import RecipeFormSteps from '../components/RecipeFormSteps';
import { RecipeFormFamilyGroup } from '../components/RecipeFormFamilyGroup';
import IconButton from '../UI/IconButton';
import Label from '../UI/Label';
import Textarea from '../UI/Textarea';
import H3Title from '../UI/H3Title';
import Button from '../UI/Button';
import Container from '../UI/Container';

const StyledIconButton = styled(IconButton)`
    margin-bottom: ${({ theme }) => theme.spacing.s};
    font: inherit;
`;
const StyledRecipeForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.m};
`;

const StyledWrapper = styled.div`
    box-shadow: ${({ theme }) => theme.shadow.s};
    border-radius: ${({ theme }) => theme.borderRadius.m};
    //min-height: ${({ theme }) => ` calc(100vh - (${theme.spacing.m}*2))`};
    padding: ${({ theme }) => theme.spacing.l};
`;

const StyledContainer = styled(Container)``;

const StyledH3Title = styled(H3Title)`
    width: 100%;

    margin-bottom: ${({ theme }) => theme.spacing.s};
`;

const StyledLabelInput = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: ${({ theme }) => theme.spacing.s};
    & > label {
        padding-left: ${({ theme }) => theme.spacing.xs};
    }
`;

const StyledSecondRowInnerWrap = styled.div`
    margin-bottom: ${({ theme }) => theme.spacing.l};
`;

const RecipeEdit = () => {
    const theme = useTheme();
    const { familyGroups } = useAuth();
    const { recipeId } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState({});
    const [recipeImage, setRecipeImage] = useState('');
    const [contentUpdateStatus, setContentUpdateStatus] = useState(null);
    // const [imageErrorMessage, setImageErrorMessage] = useState('');
    // const [familyGroupsErrorMessage, setFamilyGroupsErrorMessage] = useState('');

    useEffect(() => {
        getRecipe(recipeId);
        getRecipeImage(recipeId);
    }, []);

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

    // Submit update (name, desc, url, ing, steps, note)
    const contentUpdateHandler = async () => {
        const reqBody = '';
        setContentUpdateStatus(null);
        try {
            let isValidFields = true;
            // TODO - make sure name is filled
            const cleanedIngredients = recipe.ingredients.filter((ing) => {
                if (ing.name !== '' && ing.amount !== '') {
                    delete ing.tempId;
                    return ing;
                }
                if (ing.name === '' && ing.amount === '') {
                    return;
                }
                if (ing.name === '') {
                    setContentUpdateStatus('Please fill ingredient name');
                    setTimeout(() => {
                        setContentUpdateStatus(null);
                    }, 7000);
                    isValidFields = false;
                    return;
                } else if (ing.amount === '') {
                    setContentUpdateStatus('Please fill ingredient amount');
                    setTimeout(() => {
                        setContentUpdateStatus(null);
                    }, 7000);
                    isValidFields = false;
                    return;
                }
            });

            const reqBody = {
                name: recipe.name,
                recipeDescription: recipe.recipeDescription,
                externalUrl: recipe.externalUrl,
                portions: recipe.portions,
                ingredients: cleanedIngredients,
                steps: recipe.steps,
                note: recipe.note,
            };
            console.log(cleanedIngredients);
            if (isValidFields) {
                const response = await updateRecipeApiCall(recipeId, reqBody);
                if (!response.ok) {
                    throw new Error('Something went wrong');
                }
                setContentUpdateStatus('Update Success');
                setTimeout(() => {
                    setContentUpdateStatus(null);
                }, 5000);
                getRecipe(recipeId);
            }
        } catch (error) {
            // setSubmissionStatus('fail');
            setContentUpdateStatus('Update fail');
            console.log(error);
        }
    };
    // Submit images update (image)
    const imageUpdateHandler = async (recipeImageFile) => {
        console.log(recipeImageFile);
        // setErrorMessage('');
        try {
            if (recipeImageFile === '') {
                return;
                // setErrorMessage('Please choose an image');
            }
            const reqBody = new FormData();
            reqBody.append('recipeImage', recipeImageFile);
            const response = await uploadRecipeImageApiCall(recipeId, reqBody);
            if (!response.ok) {
                throw new Error('Recipe Image upload fail');
            }
            getRecipeImage(recipeId);
        } catch (error) {}
    };

    // Submit images delete (image)
    const imageDeleteHandler = async () => {
        // setErrorMessage('');
        try {
            const response = await deleteRecipeImageApiCall(recipeId);
            if (!response.ok) {
                throw new Error('Recipe Image upload fail');
            }
            getRecipeImage(recipeId);
        } catch (error) {}
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
                    <StyledRecipeForm>
                        <StyledWrapper>
                            <StyledContainer>
                                <StyledH3Title color={theme.colors.orange}>Recipe Image</StyledH3Title>

                                <RecipeFormImage
                                    image={recipeImage}
                                    imageSubmitHandler={imageUpdateHandler}
                                    deleteImageSubmitHandler={imageDeleteHandler}
                                />
                            </StyledContainer>
                        </StyledWrapper>
                        <StyledWrapper>
                            <StyledContainer>
                                <StyledSecondRowInnerWrap>
                                    <StyledH3Title color={theme.colors.orange}>Basic Info</StyledH3Title>
                                    <RecipeFormBasicInfo
                                        recipe={recipe}
                                        setRecipe={setRecipe}
                                    />
                                </StyledSecondRowInnerWrap>
                                <StyledSecondRowInnerWrap>
                                    <StyledH3Title color={theme.colors.orange}>Ingredients</StyledH3Title>
                                    <RecipeFormIngredients
                                        recipe={recipe}
                                        setRecipe={setRecipe}
                                    />
                                </StyledSecondRowInnerWrap>
                                <StyledSecondRowInnerWrap>
                                    <StyledH3Title color={theme.colors.orange}>Steps</StyledH3Title>
                                    <RecipeFormSteps
                                        recipe={recipe}
                                        setRecipe={setRecipe}
                                    />
                                </StyledSecondRowInnerWrap>

                                <StyledLabelInput>
                                    <StyledH3Title color={theme.colors.orange}>Additional Info</StyledH3Title>
                                    <Label
                                        label="Note"
                                        color={theme.colors.green}
                                    />
                                    <Textarea
                                        onChange={(event) => setRecipe({ ...recipe, note: event.target.value })}
                                        defaultValue={recipe.note}
                                        rows={5}
                                    />
                                </StyledLabelInput>
                                <Button
                                    color="lightGreen"
                                    variant="contain"
                                    onClick={contentUpdateHandler}
                                >
                                    Save
                                </Button>
                                {contentUpdateStatus}
                                {/*  https://www.freecodecamp.org/news/build-dynamic-forms-in-react/ */}
                            </StyledContainer>
                        </StyledWrapper>

                        <StyledWrapper>
                            <StyledContainer>
                                <StyledH3Title color={theme.colors.orange}>Family Groups</StyledH3Title>
                                <RecipeFormFamilyGroup
                                    recipe={recipe}
                                    familyGroups={familyGroups}
                                    removeFamilyGroupSubmitHandler={familyGroupsRemoveHandler}
                                    familyGroupSubmitHandler={familyGroupsUpdateHandler}
                                />
                            </StyledContainer>
                        </StyledWrapper>
                    </StyledRecipeForm>
                )}
            </ErrorBoundary>
        </>
    );
};

export default RecipeEdit;
