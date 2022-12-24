import React from 'react';
import styled, { useTheme } from 'styled-components';
import RecipeLists from '../components/RecipeLists';
import { useAuth } from '../contexts/AuthContext';
import Container from '../UI/Container';
import { PlusCircle } from 'react-bootstrap-icons';
import Button from '../UI/Button';

const StyledRecipes = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.m};
`;

const StyledWrapper = styled.div`
    box-shadow: ${({ theme }) => theme.shadow.s};
    border-radius: ${({ theme }) => theme.borderRadius.m};
    padding: ${({ theme }) => theme.spacing.l};
`;

const Recipes = () => {
    return (
        <StyledRecipes>
            <Button
                color="blue"
                variant="text"
                onClick={() => console.log('test')}
                style={{ marginLeft: 'auto' }}
            >
                Create New Recipe
            </Button>

            <StyledWrapper>
                <Container>
                    <RecipeLists />
                </Container>
            </StyledWrapper>
        </StyledRecipes>
    );
};

export default Recipes;
