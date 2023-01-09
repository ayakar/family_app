import React from 'react';
import styled, { useTheme } from 'styled-components';
import RecipeLists from '../components/RecipeLists';
import Container from '../UI/Container';
import { PlusCircleFill } from 'react-bootstrap-icons';
import Button from '../UI/Button';
import ErrorBoundary from '../ErrorBoundary';

const StyledRecipes = styled.div``;

const Recipes = () => {
    return (
        <StyledRecipes>
            <Container>
                <ErrorBoundary>
                    <Button
                        color="blue"
                        variant="text"
                        onClick={() => console.log('create new recipe clicked')}
                    >
                        <PlusCircleFill size={20} />
                        Create New Recipe
                    </Button>
                </ErrorBoundary>
                <ErrorBoundary>
                    <RecipeLists />
                </ErrorBoundary>
            </Container>
        </StyledRecipes>
    );
};

export default Recipes;
