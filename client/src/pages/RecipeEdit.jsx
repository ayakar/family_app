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
import ButtonWithMessage from '../UI/ButtonWithMessage';

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
    const [contentUpdateErrorMessage, setContentUpdateErrorMessage] = useState(null);
    // const [imageStatus, setImageStatus] = useState(''); // null, success, fail
    // const [imageErrorMessage, setImageErrorMessage] = useState('');
    const [familyGroupStatus, setFamilyGroupStatus] = useState(null); // null, success, fail
    const [familyGroupsErrorMessage, setFamilyGroupsErrorMessage] = useState('');

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
            console.log(recipe.name);
            if (recipe.name === '') {
                setContentUpdateStatus('fail');
                setContentUpdateErrorMessage('Please fill recipe name');
                return;
            }

            const cleanedIngredients = recipe.ingredients.filter((ing) => {
                if (ing.name !== '' && ing.amount !== '') {
                    delete ing.tempId;
                    return ing;
                }
                if (ing.name === '' && ing.amount === '') {
                    return;
                }
                if (ing.name === '') {
                    setContentUpdateStatus('fail');
                    setContentUpdateErrorMessage('Please fill ingredient name');
                    setTimeout(() => {
                        setContentUpdateStatus(null);
                        setContentUpdateErrorMessage('');
                    }, 7000);
                    isValidFields = false;
                    return;
                } else if (ing.amount === '') {
                    setContentUpdateStatus('fail');
                    setContentUpdateErrorMessage('Please fill ingredient amount');
                    setTimeout(() => {
                        setContentUpdateStatus(null);
                        setContentUpdateErrorMessage('');
                    }, 7000);
                    isValidFields = false;
                    return;
                }
            });

            const cleanedSteps = recipe.steps.filter((step) => {
                if (step.description !== '') {
                    delete step.tempId;
                    return step;
                }
                if (step.description === '') {
                    return;
                }
            });

            const reqBody = {
                name: recipe.name,
                recipeDescription: recipe.recipeDescription,
                externalUrl: recipe.externalUrl,
                portions: recipe.portions,
                ingredients: cleanedIngredients,
                steps: cleanedSteps,
                note: recipe.note,
            };
            console.log(cleanedIngredients);
            if (isValidFields) {
                const response = await updateRecipeApiCall(recipeId, reqBody);
                if (!response.ok) {
                    throw new Error('Something went wrong');
                }
                setContentUpdateStatus('success');
                setTimeout(() => {
                    setContentUpdateStatus(null);
                }, 5000);
                getRecipe(recipeId);
            }
        } catch (error) {
            // setSubmissionStatus('fail');
            setContentUpdateStatus('fail');
            setContentUpdateErrorMessage('Update Fail');
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
        setFamilyGroupStatus(null);
        setFamilyGroupsErrorMessage('');
        try {
            if (!reqBody) {
                setFamilyGroupStatus('fail');
                setFamilyGroupsErrorMessage('Please chose a family group');
                return;
            }
            const response = await addFamilyGroupToRecipeApiCall(recipeId, { familyGroup: reqBody });
            if (!response.ok) {
                throw new Error();
            }
            setFamilyGroupStatus('success');
            getRecipe(recipeId);
        } catch (error) {
            setFamilyGroupStatus('fail');
            setFamilyGroupsErrorMessage('Something went wrong');
        } finally {
            setTimeout(() => {
                setFamilyGroupStatus(null);
                setFamilyGroupsErrorMessage('');
            }, 2000);
        }
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
                                <ButtonWithMessage
                                    color="lightGreen"
                                    variant="contain"
                                    onClick={contentUpdateHandler}
                                    errorMessage={contentUpdateStatus === 'fail' && contentUpdateErrorMessage}
                                    successMessage={contentUpdateStatus === 'success' && 'Updated Successfully'}
                                >
                                    Save
                                </ButtonWithMessage>
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
                                    errorMessage={familyGroupStatus === 'fail' && familyGroupsErrorMessage}
                                    successMessage={familyGroupStatus === 'success' && 'Family group added successfully!'}
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
