import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

import RecipeFormImage from './RecipeFormImage';
import RecipeFormBasicInfo from './RecipeFormBasicInfo';
import RecipeFormIngredients from './RecipeFormIngredients';
import RecipeFormSteps from './RecipeFormSteps';
import { RecipeFormFamilyGroup } from './RecipeFormFamilyGroup';

import Label from '../UI/Label';
import Textarea from '../UI/Textarea';
import H3Title from '../UI/H3Title';
import Button from '../UI/Button';
import Container from '../UI/Container';

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

const StyledFirstRowInnerWrap = styled.div`
    display: flex;
    align-items: flex-end;
    gap: ${({ theme }) => theme.spacing.m};
`;

const StyledSecondRowInnerWrap = styled.div`
    margin-bottom: ${({ theme }) => theme.spacing.l};
`;

const RecipeEditForm = ({
    recipeImage,
    recipe,
    setRecipe,
    contentSubmitHandler,
    setContentContentUpdateStatus,
    contentContentUpdateStatus,
    imageSubmitHandler,
    imageDeleteHandler,
    removeFamilyGroupSubmitHandler,
    familyGroupSubmitHandler,
}) => {
    const theme = useTheme();
    const { familyGroups } = useAuth();
    const [image, setImage] = useState('');

    useEffect(() => {
        setImage(recipeImage);
    }, [recipeImage]);

    // Submit (name, desc, url, ing, steps, note)
    const contentSubmit = () => {
        let isValidFields = true;
        try {
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
                    setContentContentUpdateStatus('Please fill ingredient name');
                    setTimeout(() => {
                        setContentContentUpdateStatus(null);
                    }, 7000);
                    isValidFields = false;
                    return;
                } else if (ing.amount === '') {
                    setContentContentUpdateStatus('Please fill ingredient amount');
                    setTimeout(() => {
                        setContentContentUpdateStatus(null);
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
                contentSubmitHandler(reqBody);
            }
        } catch (error) {
            // setContentContentUpdateStatus(error);
            // setTimeout(() => {
            //     setContentContentUpdateStatus(null);
            // }, 5000);
        }
    };

    return (
        <>
            <StyledRecipeForm>
                <StyledWrapper>
                    <StyledContainer>
                        <StyledH3Title color={theme.colors.orange}>Recipe Image</StyledH3Title>
                        <StyledFirstRowInnerWrap>
                            <RecipeFormImage
                                image={image}
                                imageSubmitHandler={imageSubmitHandler}
                                deleteImageSubmitHandler={imageDeleteHandler}
                            />
                        </StyledFirstRowInnerWrap>
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
                            onClick={contentSubmit}
                        >
                            Save
                        </Button>
                        {/* <Button
                            color="green"
                            variant="text"
                            onClick={() => {
                                console.log('cancel clicked');
                            }}
                        >
                            Cancel
                        </Button> */}
                        {contentContentUpdateStatus}
                        {/* 
            <div>{JSON.stringify(ingredients)}</div>
            <div>{JSON.stringify(steps)}</div>
            https://www.freecodecamp.org/news/build-dynamic-forms-in-react/
    */}
                    </StyledContainer>
                </StyledWrapper>

                <StyledWrapper>
                    <StyledContainer>
                        <StyledH3Title color={theme.colors.orange}>Family Groups</StyledH3Title>
                        <RecipeFormFamilyGroup
                            recipe={recipe}
                            familyGroups={familyGroups}
                            removeFamilyGroupSubmitHandler={removeFamilyGroupSubmitHandler}
                            familyGroupSubmitHandler={familyGroupSubmitHandler}
                        />
                    </StyledContainer>
                </StyledWrapper>
            </StyledRecipeForm>
        </>
    );
};

export default RecipeEditForm;
