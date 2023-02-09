import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import Input from '../UI/Input';
import Label from '../UI/Label';
import Textarea from '../UI/Textarea';
import H3Title from '../UI/H3Title';
import Button from '../UI/Button';
import Container from '../UI/Container';
import IconButton from '../UI/IconButton';
import { DashCircle, PlusCircle, HouseFill, PencilFill, CupHot } from 'react-bootstrap-icons';
import Modal from '../UI/Modal';
import { useAuth } from '../contexts/AuthContext';
import Select from '../UI/Select';
import DropZone from '../UI/DropZone';

const StyledRecipeFrom = styled.div`
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

// const StyledIconButton = styled(IconButton)`
//     margin-bottom: ${({ theme }) => theme.spacing.s};
// `;

const StyledFirstRowInnerWrap = styled.div`
    display: flex;
    align-items: flex-end;
    gap: ${({ theme }) => theme.spacing.m};
`;

const StyledImageWrapper = styled.div`
    width: ${({ theme }) => theme.recipeImageSize.m.width};
    height: ${({ theme }) => theme.recipeImageSize.m.height};
`;

const StyledImage = styled.img`
    width: 100%;
    height: 100%;
    border-radius: ${({ theme }) => theme.borderRadius.m};
    object-fit: cover;
`;

const StyledButtonWrapper = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.s};
`;

const StyledSecondRowInnerWrap = styled.div`
    margin-bottom: ${({ theme }) => theme.spacing.l};
`;

const StyledIngredientLists = styled.div`
    width: 100%;
    /* border: ${({ theme }) => `${theme.colors.lightGray} 1px solid`}; */
    /* max-width: 400px; */
`;
const StyledIngredientList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing.xs};
    padding-top: ${({ theme }) => theme.spacing.xs};
    padding-bottom: ${({ theme }) => theme.spacing.xs};

    & ~ & {
        /* border-top: ${({ theme }) => `${theme.colors.lightGray} 1px solid`}; */
    }
`;
const StyledStepsWrapper = styled.div``;
const StyledStepWrapper = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.m};
    margin-bottom: ${({ theme }) => theme.spacing.s};
    & > textarea {
        flex: 1;
    }
`;
const StyledStepNumber = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: ${({ theme }) => theme.borderRadius.s};
    background-color: ${({ theme }) => theme.colors.gray};
    height: 25px;
    min-width: 25px;
    padding: 3px;
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fontSize.s};
    font-weight: ${({ theme }) => theme.fontWeight.xl};
`;
const StyledFamilyGroupList = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.xs};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const RecipeFrom = ({
    recipeImage,
    recipe,
    setRecipe,
    contentSubmitHandler,
    setContentContentUpdateStatus,
    contentContentUpdateStatus,
    imageSubmitHandler,
    imageDeleteHandler,
    familyGroupsUpdateHandler,
    familyGroupsRemoveHandler,
}) => {
    const theme = useTheme();
    const { familyGroups, getUserFamilyGroups } = useAuth();
    const [image, setImage] = useState('');
    const [isAddFamilyModalOpen, setIsAddFamilyModalOpen] = useState(false);
    const [recipeImageFile, setRecipeImageFile] = useState('');

    const [familyGroupSelectValue, setFamilyGroupSelectValue] = useState('');

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
            // TODO - remove empty field from ingredients

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
    // Submit (image)
    const imageSubmit = () => {
        imageSubmitHandler(recipeImageFile);
    };
    // Submit Delete image
    const deleteImageSubmit = () => {
        imageDeleteHandler();
    };

    // Update ingredients
    const onChangeIngredientsHandler = (id, property, value) => {
        console.log('onchange', id, property, value);
        const newArray = recipe.ingredients.map((ing) => (ing._id === id || ing.tempId === id ? { ...ing, [property]: value } : ing));
        setRecipe({ ...recipe, ingredients: newArray });
    };
    // Add Ingredients field
    const addIngredientsField = () => {
        const newIngField = {
            name: '',
            amount: '',
            // tempId: Math.floor(Math.random() * 10000),
            tempId: recipe.ingredients.length + 1,
        };
        setRecipe({ ...recipe, ingredients: [...recipe.ingredients, newIngField] });
    };

    // Remove Ingredients field
    const removeIngredients = (id) => {
        const newIngArr = recipe.ingredients.filter((ing) => ing._id !== id && ing.tempId !== id);
        console.log(newIngArr);
        setRecipe({ ...recipe, ingredients: newIngArr });
    };

    // Update Steps
    const onChangeStepsHandler = (id, value) => {
        const newArray = recipe.steps.map((step) => (step._id === id || step.tempId === id ? { ...step, description: value } : step));
        setRecipe({ ...recipe, steps: newArray });
    };

    // Add Steps field
    const addStepsField = () => {
        const newStepField = {
            description: '',
            // tempId: Math.floor(Math.random() * 10000),
            tempId: recipe.steps.length + 1,
        };
        setRecipe({ ...recipe, steps: [...recipe.steps, newStepField] });
    };

    // Remove Steps field
    const removeSteps = (id) => {
        const newStepArr = recipe.steps.filter((step) => step._id !== id && step.tempId !== id);
        setRecipe({ ...recipe, steps: newStepArr });
    };

    // Delete Family Group
    const removeFamilyGroup = (familyGroupId) => {
        console.log('removing', familyGroupId);
        familyGroupsRemoveHandler(familyGroupId);
    };

    // Submit Add Family Group (familyGroup)
    const familyGroupSubmit = () => {
        // TODO: select need initial value or place holder
        familyGroupsUpdateHandler(familyGroupSelectValue);
    };

    return (
        <>
            <StyledRecipeFrom>
                <StyledWrapper>
                    <StyledContainer>
                        <StyledH3Title color={theme.colors.orange}>Recipe Image</StyledH3Title>
                        <StyledFirstRowInnerWrap>
                            <StyledImageWrapper>
                                {image ? (
                                    <StyledImage
                                        src={image}
                                        alt="recipe image"
                                    />
                                ) : (
                                    <DropZone
                                        file={recipeImageFile}
                                        setFile={setRecipeImageFile}
                                        maximumFileSize={1000000}
                                        //setErrorMessage={() => setErrorMessage('Please upload less than 1 MB file')}
                                    />
                                )}
                            </StyledImageWrapper>
                            <StyledButtonWrapper>
                                {!image && (
                                    <>
                                        <Button
                                            variant="contain"
                                            color="lightGreen"
                                            disabled={recipeImageFile ? false : true}
                                            onClick={imageSubmit}
                                        >
                                            Upload Image
                                        </Button>
                                        {recipeImageFile && (
                                            <Button
                                                variant="text"
                                                color="green"
                                                onClick={() => setRecipeImageFile('')}
                                            >
                                                Cancel
                                            </Button>
                                        )}
                                    </>
                                )}

                                {image && (
                                    <Button
                                        variant="contain"
                                        color="lightGreen"
                                        onClick={deleteImageSubmit}
                                    >
                                        Delete this image
                                    </Button>
                                )}
                            </StyledButtonWrapper>
                        </StyledFirstRowInnerWrap>
                    </StyledContainer>
                </StyledWrapper>
                <StyledWrapper>
                    <StyledContainer>
                        <StyledSecondRowInnerWrap>
                            <StyledH3Title color={theme.colors.orange}>Basic Info</StyledH3Title>
                            <StyledLabelInput>
                                <Label
                                    label="Recipe Name"
                                    color={theme.colors.green}
                                />
                                <Input
                                    onChange={(event) => setRecipe({ ...recipe, name: event.target.value })}
                                    defaultValue={recipe.name}
                                />
                            </StyledLabelInput>
                            <StyledLabelInput>
                                <Label
                                    label="Description"
                                    color={theme.colors.green}
                                />
                                <Textarea
                                    onChange={(event) => setRecipe({ ...recipe, recipeDescription: event.target.value })}
                                    defaultValue={recipe.recipeDescription}
                                    rows={5}
                                />
                            </StyledLabelInput>
                            <StyledLabelInput>
                                <Label
                                    label="Reference Url"
                                    color={theme.colors.green}
                                />
                                <Input
                                    onChange={(event) => setRecipe({ ...recipe, externalUrl: event.target.value })}
                                    defaultValue={recipe.externalUrl}
                                />
                            </StyledLabelInput>
                        </StyledSecondRowInnerWrap>
                        <StyledSecondRowInnerWrap>
                            <StyledH3Title color={theme.colors.orange}>Ingredients</StyledH3Title>
                            <StyledLabelInput>
                                <Label
                                    label="Portion"
                                    color={theme.colors.green}
                                />
                                <Input
                                    onChange={(event) => setRecipe({ ...recipe, portions: event.target.value })}
                                    defaultValue={recipe.portions}
                                />
                            </StyledLabelInput>
                            <Label
                                label="Ingredients"
                                color={theme.colors.green}
                            />

                            <StyledIngredientLists>
                                {recipe.ingredients &&
                                    recipe.ingredients.map((ing, index) => {
                                        const id = ing._id || ing.tempId;
                                        return (
                                            <StyledIngredientList key={ing._id || ing.tempId}>
                                                <Input
                                                    key={id}
                                                    onChange={(event) => onChangeIngredientsHandler(id, 'name', event.target.value)}
                                                    defaultValue={recipe.ingredients[index].name}
                                                />
                                                <Input
                                                    onChange={(event) => onChangeIngredientsHandler(id, 'amount', event.target.value)}
                                                    defaultValue={recipe.ingredients[index].amount}
                                                />

                                                <IconButton onClick={() => removeIngredients(id)}>
                                                    <DashCircle
                                                        color={theme.colors.pink}
                                                        size={15}
                                                    />
                                                </IconButton>
                                            </StyledIngredientList>
                                        );
                                    })}

                                <IconButton onClick={addIngredientsField}>
                                    <PlusCircle
                                        color={theme.colors.green}
                                        size={23}
                                    />
                                    Add More Ingredients
                                </IconButton>
                            </StyledIngredientLists>
                        </StyledSecondRowInnerWrap>
                        <StyledSecondRowInnerWrap>
                            <StyledH3Title color={theme.colors.orange}>Steps</StyledH3Title>
                            {/* <pre>{JSON.stringify(recipe.steps, null, 2)}</pre> */}
                            <StyledStepsWrapper>
                                {recipe.steps &&
                                    recipe.steps.map((step, index) => {
                                        const id = step._id || step.tempId;
                                        return (
                                            <StyledStepWrapper key={id}>
                                                <StyledStepNumber>{index + 1}</StyledStepNumber>
                                                <Textarea
                                                    onChange={(event) => onChangeStepsHandler(id, event.target.value)}
                                                    defaultValue={step.description}
                                                    rows={5}
                                                />
                                                <IconButton onClick={() => removeSteps(id)}>
                                                    <DashCircle
                                                        color={theme.colors.pink}
                                                        size={15}
                                                    />
                                                </IconButton>
                                            </StyledStepWrapper>
                                        );
                                    })}
                                <IconButton onClick={addStepsField}>
                                    <PlusCircle
                                        color={theme.colors.green}
                                        size={23}
                                    />
                                    Add More Step
                                </IconButton>
                            </StyledStepsWrapper>
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
                        <Button
                            color="green"
                            variant="text"
                            onClick={() => {
                                console.log('cancel clicked');
                            }}
                        >
                            Cancel
                        </Button>
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
                        {recipe.familyGroupIds &&
                            recipe.familyGroupIds.map((familyId) => (
                                <StyledFamilyGroupList key={familyId._id}>
                                    <HouseFill color={theme.colors.gray} />
                                    {familyId.name}
                                    {familyId._id !== recipe.primaryFamilyGroup && (
                                        <IconButton onClick={() => removeFamilyGroup(familyId._id)}>
                                            <DashCircle color={theme.colors.pink} />
                                        </IconButton>
                                    )}
                                </StyledFamilyGroupList>
                            ))}

                        <IconButton onClick={() => setIsAddFamilyModalOpen(true)}>
                            <PlusCircle
                                color={theme.colors.green}
                                size={23}
                            />
                            <span>Add More Family Group</span>
                        </IconButton>
                    </StyledContainer>
                </StyledWrapper>
            </StyledRecipeFrom>
            <Modal
                isOpen={isAddFamilyModalOpen}
                closeHandler={() => setIsAddFamilyModalOpen(false)}
            >
                {/* TODO: filter options to removed groups already joined */}
                <Select
                    onChange={setFamilyGroupSelectValue}
                    value={familyGroupSelectValue}
                    options={familyGroups}
                    optionsProperties={{ value: '_id', label: 'name' }}
                />
                <Button
                    onClick={familyGroupSubmit}
                    variant="contain"
                    color="blue"
                >
                    Add this family group
                </Button>
            </Modal>
        </>
    );
};

export default RecipeFrom;
