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
const StyledLink = styled(Link)`
    display: flex;
    gap: ${({ theme }) => theme.spacing.xs};
    margin-top: ${({ theme }) => theme.spacing.s};
    font: inherit;
    text-decoration: none;
`;

const RecipeSingleFirstRow = ({ recipeId, name, recipeOwnerId, currentUserId }) => {
    return (
        <StyledRecipeSingleFirstRow>
            <StyledTitle>{name}</StyledTitle>
            {recipeOwnerId === currentUserId && (
                <StyledLink to={`/recipes/edit/${recipeId}`}>
                    <Pencil size="20" />
                    Edit This Recipe
                </StyledLink>
            )}
        </StyledRecipeSingleFirstRow>
    );
};

export default RecipeSingleFirstRow;
