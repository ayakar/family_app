import React from 'react';
import styled from 'styled-components';
import { Pencil, Trash3 } from 'react-bootstrap-icons';
import IconButton from '../UI/IconButton';
import { Link } from 'react-router-dom';

const StyledRecipeSingleFirstRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
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
    font: inherit;
    text-decoration: none;
`;

const RecipeSingleFirstRow = ({ recipeId, name, recipeOwnerId, currentUserId, deleteSubmitHandler }) => {
    return (
        <StyledRecipeSingleFirstRow>
            <StyledTitle>{name}</StyledTitle>
            {recipeOwnerId === currentUserId && (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <StyledLink to={`/recipes/edit/${recipeId}`}>
                        <Pencil size="20" />
                    </StyledLink>
                    <IconButton onClick={deleteSubmitHandler}>
                        <Trash3 size="20" />
                    </IconButton>
                </div>
            )}
        </StyledRecipeSingleFirstRow>
    );
};

export default RecipeSingleFirstRow;
