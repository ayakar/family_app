import React from 'react';
import styled from 'styled-components';
import { Pencil } from 'react-bootstrap-icons';
import IconButton from '../UI/IconButton';
import { Link } from 'react-router-dom';

const StyledRecipeSingleFirstRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: ${({ theme }) => theme.spacing.s};
`;
const StyledTitle = styled.h2`
    /* /* width: ${({ theme }) => theme.recipeImageSize.l.width}; */
    max-width: 550px;
    color: ${({ theme }) => theme.colors.orange};
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: ${({ theme }) => theme.fontWeight.xl};
    text-transform: capitalize;
`;

// Editing icon
const StyledIconButton = styled(IconButton)`
    display: flex;
    gap: ${({ theme }) => theme.spacing.xs};
    font: inherit;
    margin-top: ${({ theme }) => theme.spacing.s};
`;
const StyledPencil = styled(Pencil)`
    /* position: absolute;
    top: 10px;
    right: 10px; */
`;

const RecipeSingleFirstRow = ({ recipeId, name, recipeOwnerId, currentUserId }) => {
    return (
        <StyledRecipeSingleFirstRow>
            <StyledTitle>{name}</StyledTitle>
            {recipeOwnerId === currentUserId && (
                <>
                    <StyledIconButton onClick={() => console.log('edit page')}>
                        <StyledPencil size="20" />
                        Edit This Recipe
                    </StyledIconButton>
                    <Link to={`/recipes/edit/${recipeId}`}>new recipe</Link>
                </>
            )}
        </StyledRecipeSingleFirstRow>
    );
};

export default RecipeSingleFirstRow;
