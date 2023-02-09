import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import Input from '../UI/Input';
import Label from '../UI/Label';
import Textarea from '../UI/Textarea';

const StyledLabelInput = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: ${({ theme }) => theme.spacing.s};
    & > label {
        padding-left: ${({ theme }) => theme.spacing.xs};
    }
`;

const RecipeFormBasicInfo = ({ recipe, setRecipe }) => {
    const theme = useTheme();
    return (
        <>
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
        </>
    );
};

export default RecipeFormBasicInfo;
