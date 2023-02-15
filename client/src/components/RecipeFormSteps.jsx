import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import Textarea from '../UI/Textarea';
import IconButton from '../UI/IconButton';
import { DashCircle, PlusCircle } from 'react-bootstrap-icons';

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

const RecipeFormSteps = ({ recipe, setRecipe }) => {
    const theme = useTheme();

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

    return (
        <>
            <StyledStepsWrapper>
                {recipe.steps &&
                    recipe.steps.map((step, index) => {
                        const id = step._id || step.tempId;
                        return (
                            <StyledStepWrapper key={id}>
                                <StyledStepNumber>{index + 1}</StyledStepNumber>
                                <Textarea
                                    onChange={(event) => onChangeStepsHandler(id, event.target.value)}
                                    value={step.description ?? ''}
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
        </>
    );
};

export default RecipeFormSteps;
