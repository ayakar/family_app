import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { DashCircle, PlusCircle, HouseFill, PencilFill, CupHot } from 'react-bootstrap-icons';

import IconButton from '../UI/IconButton';
import Input from '../UI/Input';
import Label from '../UI/Label';

const StyledLabelInput = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: ${({ theme }) => theme.spacing.s};
    & > label {
        padding-left: ${({ theme }) => theme.spacing.xs};
    }
`;
const StyledIngredientLists = styled.div`
    width: 100%;
`;
const StyledIngredientList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing.xs};
    padding-top: ${({ theme }) => theme.spacing.xs};
    padding-bottom: ${({ theme }) => theme.spacing.xs};
`;

const RecipeFormIngredients = ({ recipe, setRecipe }) => {
    const theme = useTheme();

    // Update ingredients
    const onChangeIngredientsHandler = (id, property, value) => {
        const newArray = recipe.ingredients.map((ing) => (ing._id === id || ing.tempId === id ? { ...ing, [property]: value } : ing));
        setRecipe({ ...recipe, ingredients: newArray });
    };

    // Add Ingredients field
    const addIngredientsField = () => {
        const newIngField = {
            name: '',
            amount: '',
            tempId: recipe.ingredients.length + 1,
        };
        setRecipe({ ...recipe, ingredients: [...recipe.ingredients, newIngField] });
    };

    // Remove Ingredients field
    const removeIngredientField = (id) => {
        const newIngArr = recipe.ingredients.filter((ing) => ing._id !== id && ing.tempId !== id);
        console.log(newIngArr);
        setRecipe({ ...recipe, ingredients: newIngArr });
    };

    return (
        <>
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
                            <StyledIngredientList key={id}>
                                <Input
                                    onChange={(event) => onChangeIngredientsHandler(id, 'name', event.target.value)}
                                    defaultValue={recipe.ingredients[index].name}
                                />
                                <Input
                                    onChange={(event) => onChangeIngredientsHandler(id, 'amount', event.target.value)}
                                    defaultValue={recipe.ingredients[index].amount}
                                />

                                <IconButton onClick={() => removeIngredientField(id)}>
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
        </>
    );
};

export default RecipeFormIngredients;
