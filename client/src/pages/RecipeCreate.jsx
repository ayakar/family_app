import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useAuth } from '../contexts/AuthContext';
import { createRecipeApiCall, uploadRecipeImageApiCall } from '../api/recipeApi';
import ErrorBoundary from '../ErrorBoundary';
import RecipeFormImage from '../components/RecipeFormImage';
import RecipeFormBasicInfo from '../components/RecipeFormBasicInfo';
import RecipeFormIngredients from '../components/RecipeFormIngredients';
import RecipeFormSteps from '../components/RecipeFormSteps';
import IconButton from '../UI/IconButton';
import Label from '../UI/Label';
import Textarea from '../UI/Textarea';
import H3Title from '../UI/H3Title';
import Button from '../UI/Button';
import Container from '../UI/Container';
import Select from '../UI/Select';
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

const StyledRowInnerWrap = styled.div`
    margin-bottom: ${({ theme }) => theme.spacing.l};
`;

const RecipeCreate = () => {
    const theme = useTheme();
    const { familyGroups } = useAuth();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState({
        name: '',
        portions: '',
        ingredients: [{ tempId: 1, name: '', amount: '' }],
        steps: [{ tempId: 1, description: '' }],
        recipeDescription: '',
        externalUrl: '',
        note: '',
        primaryFamilyGroup: '',
    });
    const [recipeImageFile, setRecipeImageFile] = useState('');
    const [submitStatus, setSubmitStatus] = useState(null);
    const [submitErrorMessage, setSubmitErrorMessage] = useState(null);

    useEffect(() => {}, []);

    // Submit update (name, desc, url, ing, steps, note)
    const submitHandler = async () => {
        setSubmitStatus(null);
        try {
            let isValidFields = true;
            // TODO - make sure name is filled on EditRecipe page as well
            if (recipe.name === '') {
                setSubmitStatus('fail');
                setSubmitErrorMessage('Please fill recipe name');
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
                    setSubmitStatus('fail');
                    setSubmitErrorMessage('Please fill ingredient name');
                    setTimeout(() => {
                        setSubmitStatus(null);
                        setSubmitErrorMessage('');
                    }, 7000);
                    isValidFields = false;
                    return;
                } else if (ing.amount === '') {
                    setSubmitStatus('fail');
                    setSubmitErrorMessage('Please fill ingredient amount');
                    setTimeout(() => {
                        setSubmitStatus(null);
                        setSubmitErrorMessage('');
                    }, 7000);
                    isValidFields = false;
                    return;
                }
            });
            if (recipe.primaryFamilyGroup === '') {
                setSubmitStatus('fail');
                setSubmitErrorMessage('Please select primary family group');
                return;
            }
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
                primaryFamilyGroup: recipe.primaryFamilyGroup,
                familyGroupIds: recipe.primaryFamilyGroup, // TODO: Modify this on backend
            };

            if (isValidFields) {
                const response = await createRecipeApiCall(reqBody);
                if (!response.ok) {
                    throw new Error('Something went wrong');
                }
                const data = await response.json();
                const newRecipeId = data._id;

                if (recipeImageFile) {
                    const reqBodyImageFile = new FormData();
                    reqBodyImageFile.append('recipeImage', recipeImageFile);
                    await uploadRecipeImageApiCall(newRecipeId, reqBodyImageFile);
                }

                setSubmitStatus('success');

                setTimeout(() => {
                    setSubmitStatus(null);
                    navigate(`/recipes/${newRecipeId}`);
                }, 2000);
            }
        } catch (error) {
            // setSubmissionStatus('fail');
            setSubmitStatus('fail');
            setSubmitErrorMessage('Recipe Create Fail');
            console.log(error);
        }
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
                {
                    <StyledRecipeForm>
                        <StyledWrapper>
                            <StyledContainer>
                                <StyledH3Title color={theme.colors.orange}>Recipe Image</StyledH3Title>
                                <StyledRowInnerWrap>
                                    <RecipeFormImage additionalOnChangeHandler={setRecipeImageFile} />
                                </StyledRowInnerWrap>
                                <StyledRowInnerWrap>
                                    <StyledH3Title color={theme.colors.orange}>Basic Info</StyledH3Title>
                                    <RecipeFormBasicInfo
                                        recipe={recipe}
                                        setRecipe={setRecipe}
                                    />
                                </StyledRowInnerWrap>
                                <StyledRowInnerWrap>
                                    <StyledH3Title color={theme.colors.orange}>Ingredients</StyledH3Title>
                                    <RecipeFormIngredients
                                        recipe={recipe}
                                        setRecipe={setRecipe}
                                    />
                                </StyledRowInnerWrap>
                                <StyledRowInnerWrap>
                                    <StyledH3Title color={theme.colors.orange}>Steps</StyledH3Title>
                                    <RecipeFormSteps
                                        recipe={recipe}
                                        setRecipe={setRecipe}
                                    />
                                </StyledRowInnerWrap>
                                <StyledLabelInput>
                                    <StyledH3Title color={theme.colors.orange}>Additional Info</StyledH3Title>
                                    <Label
                                        label="Note"
                                        color={theme.colors.green}
                                    />
                                    <Textarea
                                        onChange={(event) => setRecipe({ ...recipe, note: event.target.value })}
                                        value={recipe.note}
                                        rows={5}
                                    />
                                </StyledLabelInput>

                                <StyledRowInnerWrap>
                                    <StyledH3Title color={theme.colors.orange}>Family Group</StyledH3Title>
                                    <Select
                                        onChange={(value) => setRecipe({ ...recipe, primaryFamilyGroup: value })}
                                        value={recipe.primaryFamilyGroup}
                                        options={familyGroups}
                                        optionsProperties={{ value: '_id', label: 'name' }}
                                    />
                                </StyledRowInnerWrap>

                                <ButtonWithMessage
                                    color="lightGreen"
                                    variant="contain"
                                    onClick={submitHandler}
                                    errorMessage={submitStatus === 'fail' && submitErrorMessage}
                                    successMessage={submitStatus === 'success' && 'Recipe Created Successfully'}
                                >
                                    Save
                                </ButtonWithMessage>
                            </StyledContainer>
                        </StyledWrapper>
                    </StyledRecipeForm>
                }
            </ErrorBoundary>
        </>
    );
};

export default RecipeCreate;
