import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useAuth } from '../contexts/AuthContext';
import { createRecipeApiCall } from '../api/recipeApi';
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
        familyGroupIds: '',
    });
    const [recipeImageFile, setRecipeImageFile] = useState('');
    const [submitStatus, setSubmitStatus] = useState(null);

    useEffect(() => {}, []);

    // Submit update (name, desc, url, ing, steps, note)
    const submitHandler = async () => {
        setSubmitStatus(null);
        try {
            let isValidFields = true;
            // TODO - make sure name is filled on EditRecipe page as well
            if (recipe.name === '') {
                return setSubmitStatus('Please fill recipe name');
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
                    setSubmitStatus('Please fill ingredient name');
                    setTimeout(() => {
                        setSubmitStatus(null);
                    }, 7000);
                    isValidFields = false;
                    return;
                } else if (ing.amount === '') {
                    setSubmitStatus('Please fill ingredient amount');
                    setTimeout(() => {
                        setSubmitStatus(null);
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
            const reqBodyImageFile = new FormData();
            reqBodyImageFile.append('recipeImage', recipeImageFile);

            console.log(reqBody);
            console.log(reqBodyImageFile);
            if (isValidFields) {
                const response = await createRecipeApiCall(reqBody, reqBodyImageFile);
                if (!response.ok) {
                    throw new Error('Something went wrong');
                }
                setSubmitStatus('Recipe Created Successfully!');
                setTimeout(() => {
                    setSubmitStatus(null);
                }, 5000);
                // TODO navigate user to edit page using _id
            }
        } catch (error) {
            // setSubmissionStatus('fail');
            setSubmitStatus('Recipe Create Fail');
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
            // const response = await uploadRecipeImageApiCall(recipeId, reqBody);
            // if (!response.ok) {
            //     throw new Error('Recipe Image upload fail');
            // }
            // TODO navigate user to edit page using _id
        } catch (error) {}
    };

    return (
        <>
            <ErrorBoundary>
                <StyledIconButton onClick={() => navigate(-1)}>
                    <ArrowLeft />
                    Back to Recipe
                </StyledIconButton>
            </ErrorBoundary>
            {JSON.stringify(recipe)}
            {JSON.stringify(recipeImageFile)}
            <ErrorBoundary>
                {
                    <StyledRecipeForm>
                        <StyledWrapper>
                            <StyledContainer>
                                <StyledH3Title color={theme.colors.orange}>Recipe Image</StyledH3Title>
                                <StyledRowInnerWrap>
                                    <RecipeFormImage
                                        additionalOnChangeHandler={setRecipeImageFile} // TODO: function to get image file
                                    />
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
                                        defaultValue={recipe.note}
                                        rows={5}
                                    />
                                </StyledLabelInput>
                                {/* {familyGroups && ( */}
                                <StyledRowInnerWrap>
                                    <StyledH3Title color={theme.colors.orange}>Family Group</StyledH3Title>
                                    <Select
                                        // onChange={setFamilyGroupSelectValue} //TODO
                                        // value={familyGroupSelectValue} // TODO
                                        options={familyGroups}
                                        optionsProperties={{ value: '_id', label: 'name' }}
                                    />
                                </StyledRowInnerWrap>
                                {/* ) */}
                                {/* } */}
                                <Button
                                    color="lightGreen"
                                    variant="contain"
                                    onClick={submitHandler}
                                >
                                    Save
                                </Button>
                                {submitStatus}
                            </StyledContainer>
                        </StyledWrapper>
                    </StyledRecipeForm>
                }
            </ErrorBoundary>
        </>
    );
};

export default RecipeCreate;
